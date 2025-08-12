// Uncomment as needed, or remove if not required
//import { EvmRpc } from "@notifi-network/fusion-sdk";
import { BlockchainType, getParserBlobInput } from "@notifi-network/fusion-sdk";

// This is auto generated code for a Notifi Fusion Parser. When you execute 'npm run init-parser', it will create a template for you to start with.
// You can reference the generated code, but 

import * as GFT from "./notifi-generated/fusion-types.js";

interface ParseContext {
  contextId: string;
  parameters: Parameters;
};

interface Parameters {
  // Identifies the block/slot this invocation was triggered by.
  // Ignore for cron executions and offchain parsers.
  blockId?: string;
  // Identifies the blockchain type this parser is associated with.
  blockchainType: number;
  // URL for fetching tx and log data for this block.
  // Ignore for cron executions and offchain parsers.
  urlForBlob?: string;
  // Log indices for filtering specific logs that triggered this parser.
  // Ignore for cron executions and offchain parsers.
  logIndices?: number[];
}

const createEvent = (signature: string, md: any) => {
  return {
    // Replace with actual event type ID. You can use GFT.getEvents().* to get the ID for a specific event type.
    eventTypeId: GFT.validResponseEvents./* ----- YOUR EVENT/TOPIC HERE ----- */.id,
    // This should be a value that aligns to what you configured the event to be. * if nothing, or the wallet address of the user or account being alerted on
    comparisonValue: "*",
    blockchain: GFT.ParserBlockchainType,
    // Signature of the block, or your own custom signature that is unique for this invocation.
    changeSignature: signature,
    // Metadata to pass through to the templates used for creating the actual notifications being sent out to users. This is also what contains filterParameters used in more advanced alert configs where users can enter thresholds
    metadata: md,
    // True for comparisonValues that are case sensitive such as Solana addresses, false for those that are not such as EVM addresses.
    isComparisonValueCaseSensitive: false,
  };
};

const parse = async (
  context: ParseContext
) => {
  // The context object contains the contextId and parameters that are passed to the parser.
  // You can use these to make RPC calls or perform any other operations needed for parsing.
  // The contextId is a unique identifier for the parser instance, and parameters may contain additional data.
  const { contextId, parameters } = context;
  
  let blobInput;
  if (parameters.blockchainType !== BlockchainType.BLOCKCHAIN_TYPE_OFF_CHAIN && parameters.urlForBlob) {
    // If the blockchainType is not OFF_CHAIN, we can use the getParserBlobInput function to get the blob input.
    blobInput = await getParserBlobInput(contextId, parameters.urlForBlob);
  }

  //
  // Example of how to instantiate an EvmRpc client and make a call to get account balance.
  //
  // const rpc = new EvmRpc(contextId);
  // const response = await rpc.getAccountBalance({ accountAddress: "0xF389bffD516985d8261E6aAd63901Ce859e53b67", blockchainType: BlockchainType.BLOCKCHAIN_TYPE_BOTANIX, blockId: "0xA597F" });
  // console.log("Response:", response);
  
  //
  // PUT YOUR PARSING LOGIC HERE!!!
  //

  // Return the parsed data or any other relevant information as a flat array of objects, where each object represents
  // an event that should be processed/matched against alerts users have set up.
  // You can return multiple events for the same FusionEvent type (also referred to as 'topic' on the Admin Portal)
  // You may also return multiple different types of FusionEvent types in the same array.
  // For example, you can return a transfer event and a mint event in the same array
  // if you want to process both of them in the same parser.
  // If you don't have any events to return, you can return an empty array.
  // If you want to return a single event, you can return an array with a single object.

  // Note: The metadata (md) field is optional and can be used to pass additional information about the event.
  // Note: See https://docs.notifi.network/docs/fusion-sdk#metadata for more details on advanced metadata usage with filters.

  // Example of creating an event entry. This can be customized to pass through the appropriate values for
  // comparisonValue, changeSignature, etc.
  const singleEvent = createEvent(
    "0x1234567890abcdef1234567890abcdef1234567890abcdef1234567890",
    {
      randomCustomField1: "value1",
      randomCustomField2: "value2",
      // ... anything you want to include in the metadata, which will also be passed to the templates used for
      // creating the actual notifications being sent out to users. See https://docs.notifi.network/docs/styling-your-notifications
      // for more details on how to use this metadata in templates.
    }
  );

  var responseEvents = [singleEvent];

  // Return the array of events. We wrap a validator function to help ensure the event is valid.
  // On failure, this will throw an error and the parser will be put into an error state
  return GFT.validateResponseEvents(responseEvents);
};

export { parse };
