const jdenticon = require('jdenticon');
const fs = require('fs');
const path = require('path');

function generateAndSaveAvatar(email) {
  const generatedAvatar = jdenticon.toPng(`${email}${Date.now()}`, 200);
  const avatarName = `${email}_${Date.now()}.png`;
  const avatarDir = path.join(__dirname, '/../uploads');

  if (!fs.existsSync(avatarDir)) {
    fs.mkdirSync(avatarDir);
  }

  const avatarPath = path.join(avatarDir, avatarName);
  fs.writeFileSync(avatarPath, generatedAvatar);

  return `/uploads/${avatarName}`;
}

module.exports = { generateAndSaveAvatar };
