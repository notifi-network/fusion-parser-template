import { BlockchainType } from "@notifi-network/fusion-sdk";
import { parse } from "../src";
import { init, cleanup } from "./notifi-generated/setup";
import { getBlockFilter, ParserBlockchainType } from "../src/notifi-generated/fusion-types";
import * as fs from "fs";

//
// NOTE: Ensure you provided a valid block/checkpoint number during "npm run init-parser". If not, simply run it again!
//

const testInputFilePath = "./tests/notifi-generated/testBlockOrCheckpoint.json";

const ensureInitCompleted = async () => {
  if (ParserBlockchainType !== BlockchainType.BLOCKCHAIN_TYPE_OFF_CHAIN && !fs.existsSync(testInputFilePath)) {
    console.error(`Test file not found: ${testInputFilePath}\nIf you skipped the init step to provide a block number to test with, please run 'npm run init-parser' first, ensuring you provide it a valid block/checkpoint number when asked.`);
    throw new Error(`Project initialization not completed`);
  }
};

beforeAll(async () => {
  await ensureInitCompleted();
  
  //
  // This is where you can set up any global state or configurations needed for your tests.
  //
  await init();
});

afterAll(() => {
  //
  // This is where you can clean up any global state or configurations after all tests have run.
  //
  return cleanup();
});

describe("Ensure block filter trigger works", () => {
  it("should trigger off of the blockFilter on the block saved locally for testing", async () => {
    const blockFilter = getBlockFilter();
    expect(blockFilter).toBeDefined();

    expect(ParserBlockchainType).toBeDefined();

    // No tests here for offchain or cron executions
    if (ParserBlockchainType === BlockchainType.BLOCKCHAIN_TYPE_OFF_CHAIN || (blockFilter as any).CronInterval !== undefined) {
      return;
    }

    const jsonTestData = JSON.parse(await fs.promises.readFile(testInputFilePath, "utf-8"));
    
    if (ParserBlockchainType === BlockchainType.BLOCKCHAIN_TYPE_SOLANA) {
      // Solana tests
    } else if (ParserBlockchainType === BlockchainType.BLOCKCHAIN_TYPE_SUI) {
      // Sui tests
    } else {
      // Assume EVM tests
      const evmBlockFilter = blockFilter as any;
      const block = jsonTestData.block;
      const logs = jsonTestData.logs;
      let matchedForTopicHash = false;
      let matchedForContractAddress = false;
      if (evmBlockFilter.ContractAddresses.length > 0) {
        evmBlockFilter.ContractAddresses = evmBlockFilter.ContractAddresses.map(addr => addr.toLowerCase());
        // If there are contract addresses, we can test against them
        logs.forEach(log => {
          if (evmBlockFilter.ContractAddresses.includes(log.address.toLowerCase())) {
            matchedForContractAddress = true;
          }
        });
      } else {
        matchedForContractAddress = true;
      }

      if (evmBlockFilter.TopicHashes.length > 0) {
        evmBlockFilter.TopicHashes = evmBlockFilter.TopicHashes.map(hash => hash.toLowerCase());
        // If there are topic hashes, we can test against them
        logs.forEach(log => {
            let anyMatch = false;
            const topics = log.topics?.map(topic => topic.toLowerCase()) || [];

            evmBlockFilter.TopicHashes.forEach( (v, i) => {
              topics.forEach(element => {
                if (element === v) {
                  anyMatch = true;
                }
              });
            });

            if (anyMatch) {
              matchedForTopicHash = true;
            }
        });
      } else {
        matchedForTopicHash = true;
      }

      expect(matchedForContractAddress && matchedForTopicHash).toBe(true);
    }
  });
});

describe("Parse", () => {
  describe("basic parse", () => {
    it("should not throw an error", () => {
      const parseInput = {
        contextId: "testContext",
        parameters: {
            blockchainType: ParserBlockchainType,
            urlForBlob: "redis://test/1234",
        }
      };
      const result = parse(parseInput);
      expect(result).toBeDefined();
      expect(result).toBeInstanceOf(Promise);
      return result.then((events) => {
        expect(events).toBeDefined();
        expect(Array.isArray(events)).toBe(true);
        expect(events.length).toBeGreaterThan(0);
        events.forEach(event => {
          expect(event).toHaveProperty("comparisonValue");
          expect(event).toHaveProperty("blockchain");
          expect(event).toHaveProperty("changeSignature");
          expect(event).toHaveProperty("metadata");
          expect(event).toHaveProperty("isComparisonValueCaseSensitive");

          expect(event.blockchain).toBe(ParserBlockchainType);
        });
      });
    });
  });
});