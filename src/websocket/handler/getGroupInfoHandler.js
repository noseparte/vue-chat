import AbstractMessageHandler from "./abstractmessagehandler";
import {GPGI, PUB_ACK} from "../../constant";
import GroupInfo from "../model/groupInfo";

export default class GetGroupInfoHandler extends AbstractMessageHandler {

  match(proto) {
    return proto.signal == PUB_ACK && proto.subSignal == GPGI;
  }

  processMessage(proto) {
    if (proto.content != null) {
      console.log("GetGroupInfoHandler content: ", proto.content);
      var groupInfoList = JSON.parse(proto.content);
      var groups = [];
      for (var groupInfo of groupInfoList) {
        var group2 = GroupInfo.convert2GroupInfo(groupInfo);
        groups.push(group2);
        this.vueWebsocket.sendAction("getGroupMember", group2.target)
      }
      this.vueWebsocket.sendAction("updateGroupInfos", groups);
    }
  }
}
