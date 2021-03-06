import AbstractMessageHandler from "./abstractmessagehandler";
import {GPGM, PUB_ACK} from "../../constant";
import GroupMember from "../model/groupMember";

export default class GetGroupMemberHandler extends AbstractMessageHandler {
  match(proto) {
    return proto.signal == PUB_ACK && proto.subSignal == GPGM;
  }

  notifyContent(content) {
    console.log("GetGroupMemberHandler content: ", content);
    var groupMemberList = JSON.parse(content);
    var groupMembers = [];
    for (var groupMember of groupMemberList) {
      groupMembers.push(GroupMember.convert2GroupMember(groupMember));
    }
    return groupMembers;
  }
}
