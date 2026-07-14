import User from "../models/User.js";

// Get Logged-in User Profile
export const getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    res.status(200).json(user);

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
export const followUser = async (req, res) => {
  try {

    const currentUser = await User.findById(req.user.id);
    const targetUser = await User.findById(req.params.id);

    if (!targetUser) {
      return res.status(404).json({
        message: "User not found"
      });
    }

    if (!currentUser.following.includes(targetUser._id)) {

      currentUser.following.push(targetUser._id);
      targetUser.followers.push(currentUser._id);

      await currentUser.save();
      await targetUser.save();
    }

    res.json({
      success: true,
      message: "User Followed"
    });

  } catch (error) {

    res.status(500).json({
      message: error.message
    });

  }
};
export const unfollowUser = async (req, res) => {
  try {

    const currentUser = await User.findById(req.user.id);
    const targetUser = await User.findById(req.params.id);

    currentUser.following = currentUser.following.filter(
      id => id.toString() !== targetUser._id.toString()
    );

    targetUser.followers = targetUser.followers.filter(
      id => id.toString() !== currentUser._id.toString()
    );

    await currentUser.save();
    await targetUser.save();

    res.json({
      success: true,
      message: "User Unfollowed"
    });

  } catch (error) {

    res.status(500).json({
      message: error.message
    });

  }
};