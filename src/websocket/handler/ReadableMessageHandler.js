import AbstractMessageHandler from "./abstractmessagehandler";
import { MRR,PUB_ACK } from "../../constant";
import Logger from "../utils/logger";

export default class ReadableMessageHandler extends AbstractMessageHandler{
  match(proto){
    return proto.signal == PUB_ACK && proto.subSignal == MRR;
  }

  processMessage(proto){
    var result  = JSON.parse(proto.content);
    Logger.log("friend add request result "+result);
  }
}
