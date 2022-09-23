// SPDX-License-Identifier: SEE LICENSE IN LICENSE
pragma solidity 0.8.17;

contract buycoffee {
    address owner;
    constructor() {
        owner=msg.sender;
    }
struct Memo{
    string name;
    string message;
    uint value;
}
Memo[] memos;
    event bought(string Name,string Message,uint Value);

    function buyCoffee(string memory _name,string memory _message) public payable{
        address Address = msg.sender;
        require(Address.balance>0,"Not enough eth");
        memos.push(Memo(_name,_message,msg.value));

        emit bought(_name,_message,msg.value);
    }

    function withdrawCoffee() public
{
    require(msg.sender==owner,"Not for you, sorry");
    payable(msg.sender).transfer(address(this).balance);
}

    function getMemos()public  view returns (Memo[] memory) {
        return memos;
    }
     
}