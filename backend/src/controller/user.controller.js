import FriendRequest from "../models/FriendRequest.js";
import User from "../models/user.model.js";

export async function getRecommendedUsers(req, res) {
  try {
    const currentUserId = req.user._id;
    const currentUser = req.user;

    // Find users who are not the current user and not already friends
    const recommendedUsers = await User.find({
      $and: [
        { _id: { $ne: currentUserId } },
        { _id: { $nin: currentUser.friends } },
        { isOnboarded: true },
      ],
    });

    res.status(200).json(recommendedUsers);
  } catch (error) {
    console.error("Error in getRecommendedUsers:", error);
    res.status(500).json({ message: "Server error" });
  }
}

export async function getMyFriends(req, res) {
  try {
    const user = await User.findById(req.user._id)
      .select("friends")
      .populate("friends", "fullName profilePic nativeLang learningLang");

    res.status(200).json(user.friends);

  } catch (error) {
    console.error("Error in getMyFriends:", error);
    res.status(500).json({ message: "Server error" });
  }
}

export async function sendFriendRequest(req, res) {

    try {
        
        const myId = req.user._id;
        const {  id: receipientId } = req.params;

        if(myId == receipientId){
            return res.status(400).json({ message: "You cannot send friend request to yourself" });
        }

        const receipient = await User.findById(receipientId);

        if(!receipient){
            return res.status(404).json({ message: "Receipient not found" });
        }

        // Check if a friend request already exists
        if(receipient.friends.includes(myId)){
            return res.status(400).json({ message: "You are already friends" });
        }

        const existingRequest = await FriendRequest.findOne({
            $or:[
                {
                    sender:myId, recipient:receipientId
                },
                {
                    sender:receipientId, recipient:myId
                }
            ]
        });

        if(existingRequest){
            return res.status(400).json({ message: "Friend request already exists" });
        }

        const friendrequest = new FriendRequest.create({
            sender: myId,
            recipient: receipientId
        })

        res.status(201).json(friendrequest);

    } catch (error) {
        console.error("Error in sendFriendRequest:", error);
        res.status(500).json({ message: "Server error" });
    }
}

export async function acceptFriendRequest(req, res) {
    try {
        
        const {id:requestedId} = req.params;

        const friendRequest = await FriendRequest.findById(requestedId);

        if(!friendRequest){
            return res.status(404).json({ message: "Friend request not found" });
        }

        if(friendRequest.recipient.toString() !== req.user._id.toString()){
            return res.status(403).json({ message: "You are not authorized to accept this friend request" });
        }

        friendRequest.status = "accepted";
        await friendRequest.save();

        // Update both users' friends lists
        await User.findByIdAndUpdate(friendRequest.sender, {
            $addToSet:{friends:friendRequest.recipient}
        })
        await User.findByIdAndUpdate(friendRequest.recipient, {
            $addToSet:{friends:friendRequest.sender}
        })

        res.status(200).json({ message: "Friend request accepted" });

    } catch (error) {
        console.error("Error in acceptFriendRequest:", error);
        res.status(500).json({ message: "Server error" });
    }
}