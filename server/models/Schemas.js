"use strict";
import { Sequelize } from "sequelize";
import config from "../config/config.js";
const sequelize = new Sequelize(
  config.sql.database,
  config.sql.username,
  config.sql.password,
  {
    host: config.sql.host,
    port: config.sql.port,
    dialect: config.sql.dialect,
    pool: {
      max: 5,
      min: 0,
      idle: 10000,
    },
    timezone: config.sql.timezone,
    define: {
      underscored: true,
      timestamps: true,
      charset: "utf8",
      collate: "utf8_general_ci",
      freezeTableName: true,
    },
  }
);
//--------------- Start of User Table --------------
const User = sequelize.define(
  "User",
  {
    id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },

    firstName: Sequelize.STRING(30),
    lastName: Sequelize.STRING(30),
    dob: Sequelize.STRING(30),
    age: Sequelize.STRING(4),
    religion: Sequelize.STRING(30),
    community: Sequelize.STRING(30),
    state: Sequelize.STRING(30),
    email: Sequelize.STRING(50),
    phoneNo: Sequelize.STRING(15),
    password: Sequelize.STRING(128),
    gender: Sequelize.STRING(10),
    createdFor: Sequelize.STRING(20),
    profilePic: Sequelize.TEXT(),
    profile_type: Sequelize.STRING(10),

    company: Sequelize.STRING(30),
    is_deleted: {
      type: Sequelize.TINYINT(1),
      defaultValue: 0,
    },
  },
  {
    tableName: "users",
    underscored: true,
  }
);

const Info = sequelize.define(
  "Info",
  {
    user_id: { type: Sequelize.INTEGER, allowNull: false },
    qualification: Sequelize.STRING(15),
    college: Sequelize.STRING(30),
    workWith: Sequelize.STRING(30),
    workAs: Sequelize.STRING(30),
    company: Sequelize.STRING(50),
    income: Sequelize.STRING(30),
    languageKnown: Sequelize.TEXT,
    city: Sequelize.STRING(15),
    liveWithFamily: Sequelize.STRING(15),
    maritalStatus: Sequelize.STRING(15),
    children: Sequelize.STRING(15),
    diet: Sequelize.STRING(15),
    drinkingHabit: Sequelize.STRING(50),
    smokingHabit: Sequelize.STRING(50),
    height: Sequelize.STRING(10),
    weight: Sequelize.STRING(10),
    physicalStatus: Sequelize.STRING(30),
    subCommunity: Sequelize.STRING(15),
    casteMatters: Sequelize.STRING(15),
    aboutMe: Sequelize.STRING(4000),
    mother: Sequelize.STRING(15),
    father: Sequelize.STRING(15),
    noOfSister: Sequelize.STRING(10),
    noOfBrother: Sequelize.STRING(10),
    address_modified: { type: Sequelize.BOOLEAN, defaultValue: false },
    is_deleted: {
      type: Sequelize.TINYINT(1),
      defaultValue: 0,
    },
  },
  {
    tableName: "infos",
    underscored: true,
  }
);
const PartnerPreferences = sequelize.define(
  "PartnerPreferences",
  {
    id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
    user_id: { type: Sequelize.INTEGER, allowNull: false },
    age_from: Sequelize.STRING(4),
    age_to: Sequelize.STRING(4),
    height_from: Sequelize.STRING(10),
    height_to: Sequelize.STRING(10),
    marital_status: Sequelize.STRING(20),
    mother_tongue: Sequelize.STRING(30),
    physical_status: Sequelize.STRING(30),
    eating_habits: Sequelize.STRING(30),
    drinking_habits: Sequelize.STRING(30),
    smoking_habits: Sequelize.STRING(30),
    religion: Sequelize.STRING(30),
    caste: Sequelize.STRING(30),
    dosh: Sequelize.TEXT, // JSON stringified array
    star: Sequelize.TEXT,
    rashi: Sequelize.TEXT,
    education: Sequelize.TEXT,
    work_in: Sequelize.TEXT,
    work_as: Sequelize.TEXT,
    income: Sequelize.STRING(30),
    residing_states: Sequelize.TEXT,
    residing_cities: Sequelize.TEXT,
    about_partner: Sequelize.TEXT,

    is_deleted: {
      type: Sequelize.TINYINT(1),
      defaultValue: 0,
    },
  },
  {
    tableName: "partner_preferences",
    underscored: true,
  }
);

const Verified = sequelize.define(
  "Verified",
  {
    user_id: { type: Sequelize.INTEGER, allowNull: false },
    code: Sequelize.STRING(36),
    status: Sequelize.BOOLEAN,
    is_deleted: {
      type: Sequelize.TINYINT(1),
      defaultValue: 0,
    },
  },
  {
    tableName: "verified",
    underscored: true,
  }
);

const Block = sequelize.define(
  "Block",
  {
    id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
    blocker_id: { type: Sequelize.INTEGER, allowNull: false },
    blocked_id: { type: Sequelize.INTEGER, allowNull: false },
    is_deleted: {
      type: Sequelize.TINYINT(1),
      defaultValue: 0,
    },
  },
  {
    tableName: "blocks",
    underscored: true,
  }
);

const Report = sequelize.define(
  "Report",
  {
    id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
    reported_id: { type: Sequelize.INTEGER, allowNull: false },
    reporter_id: { type: Sequelize.INTEGER, allowNull: false },
    is_deleted: {
      type: Sequelize.TINYINT(1),
      defaultValue: 0,
    },
  },
  {
    tableName: "reports",
    underscored: true,
  }
);

const Like = sequelize.define(
  "Like",
  {
    id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
    liker_id: { type: Sequelize.INTEGER, allowNull: false },
    liked_id: { type: Sequelize.INTEGER, allowNull: false },
    is_deleted: {
      type: Sequelize.TINYINT(1),
      defaultValue: 0,
    },
  },
  {
    tableName: "likes",
    underscored: true,
  }
);

const Dislike = sequelize.define(
  "Dislike",
  {
    id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
    disliker_id: { type: Sequelize.INTEGER, allowNull: false },
    disliked_id: { type: Sequelize.INTEGER, allowNull: false },
    is_deleted: {
      type: Sequelize.TINYINT(1),
      defaultValue: 0,
    },
  },
  {
    tableName: "dislikes",
    underscored: true,
  }
);

const Visit = sequelize.define(
  "Visit",
  {
    id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
    visiter_id: { type: Sequelize.INTEGER, allowNull: false },
    visited_id: { type: Sequelize.INTEGER, allowNull: false },
    time: { type: Sequelize.DATE, allowNull: false },
    is_deleted: {
      type: Sequelize.TINYINT(1),
      defaultValue: 0,
    },
  },
  {
    tableName: "visits",
    underscored: true,
  }
);

const Photo = sequelize.define(
  "Photo",
  {
    user_id: { type: Sequelize.INTEGER, allowNull: false },
    pic1: Sequelize.STRING(256),
    pic2: Sequelize.STRING(256),
    pic3: Sequelize.STRING(256),
    pic4: Sequelize.STRING(256),
    pic5: Sequelize.STRING(256),
    is_deleted: {
      type: Sequelize.TINYINT(1),
      defaultValue: 0,
    },
  },
  {
    tableName: "photos",
    underscored: true,
  }
);

const Message = sequelize.define(
  "Message",
  {
    id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
    sender_id: { type: Sequelize.INTEGER, allowNull: false },
    receiver_id: { type: Sequelize.INTEGER, allowNull: false },
    message: { type: Sequelize.STRING(256), allowNull: false },
    image: { type: Sequelize.TEXT, allowNull: false },
    seen: { type: Boolean, defaultValue: false },
    time: { type: Sequelize.STRING(30), allowNull: false },
    is_deleted: {
      type: Sequelize.TINYINT(1),
      defaultValue: 0,
    },
  },
  {
    tableName: "messages",
    underscored: true,
  }
);
const Contact = sequelize.define(
  "Contact",
  {
    id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
    user_id: { type: Sequelize.INTEGER, allowNull: false },
    is_deleted: {
      type: Sequelize.TINYINT(1),
      defaultValue: 0,
    },
  },
  {
    tableName: "contacts",
    underscored: true,
  }
);

const Setting = sequelize.define(
  "Setting",
  {
    user_id: { type: Sequelize.INTEGER, allowNull: false },
    visit: { type: Sequelize.BOOLEAN, defaultValue: true },
    like: { type: Sequelize.BOOLEAN, defaultValue: true },
    unlike: { type: Sequelize.BOOLEAN, defaultValue: true },
    match: { type: Sequelize.BOOLEAN, defaultValue: true },
    message: { type: Sequelize.BOOLEAN, defaultValue: true },
    is_deleted: {
      type: Sequelize.TINYINT(1),
      defaultValue: 0,
    },
  },
  {
    tableName: "settings",
    underscored: true,
  }
);

const Notif = sequelize.define(
  "Notif",
  {
    id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
    user_id: { type: Sequelize.INTEGER, allowNull: false },
    notifier_name: Sequelize.STRING(24),
    type: { type: Sequelize.STRING(12), allowNull: false },
    content: { type: Sequelize.STRING(64), allowNull: false },
    time: { type: Sequelize.DATE, allowNull: false },
    read: { type: Sequelize.BOOLEAN, defaultValue: false },
    is_deleted: {
      type: Sequelize.TINYINT(1),
      defaultValue: 0,
    },
  },
  {
    tableName: "notif",
    underscored: true,
  }
);

const Interest = sequelize.define(
  "Interest",
  {
    id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
    sender_id: { type: Sequelize.INTEGER, allowNull: false },
    receiver_id: { type: Sequelize.INTEGER, allowNull: false },
    status: { type: Sequelize.STRING(15), allowNull: false },
    is_deleted: {
      type: Sequelize.TINYINT(1),
      defaultValue: 0,
    },
  },
  {
    tableName: "interests",
    underscored: true,
  }
);

const Connection = sequelize.define(
  "Connection",
  {
    id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
    user_id: { type: Sequelize.INTEGER, allowNull: false },
    last_connection: Sequelize.DATE,
    is_deleted: {
      type: Sequelize.TINYINT(1),
      defaultValue: 0,
    },
  },
  {
    tableName: "conections",
    underscored: true,
  }
);

User.hasOne(Info, { foreignKey: "user_id", as: "Info" });

User.hasMany(Like, { foreignKey: "liker_id" });
Info.belongsTo(User, { as: "User", foreignKey: "user_id" });
Interest.belongsTo(User, { foreignKey: "sender_id", as: "sender" });
Interest.belongsTo(User, {
  foreignKey: "receiver_id",
  as: "receiver",
}); 

// In models/Schemas.js or corresponding model files
Like.belongsTo(User, { foreignKey: "liked_id", as: "likedUser" });
Like.belongsTo(User, { foreignKey: "liker_id", as: "likerUser" });
Like.belongsTo(Info, {
  foreignKey: "liked_id",
  targetKey: "user_id", // this is the crucial part!
  as: "likedUserInfo",
});
Like.belongsTo(Info, {
  foreignKey: "liked_id",
  targetKey: "user_id", // this is the crucial part!
  as: "likerUserInfo",
});
Connection.belongsTo(User, {
  foreignKey: 'user_id',
  as: 'connectedUser'
});
Dislike.belongsTo(User, { foreignKey: "disliked_id", as: "dislikedUser" });
Block.belongsTo(User, { foreignKey: "blocked_id", as: "blockedUser" });
Report.belongsTo(User, { foreignKey: "reported_id", as: "reportedUser" });
Connection.belongsTo(User, { foreignKey: "user_id", as: "user" });
Visit.belongsTo(User, { foreignKey: "visited_id", as: "visited" });
Visit.belongsTo(User, { foreignKey: "visiter_id", as: "visiter" });
Visit.belongsTo(Info, {
  foreignKey: "visited_id",
  targetKey: "user_id",
  as: "visitedUserInfo",
});
Visit.belongsTo(Info, {
  foreignKey: "visited_id",
  targetKey: "user_id",
  as: "visiterUserInfo",
});
Message.belongsTo(User, { foreignKey: "sender_id", as: "sender" });
Message.belongsTo(User, { foreignKey: "receiver_id", as: "receiver" });
Photo.belongsTo(User, { foreignKey: "user_id", as: "user" });
User.hasOne(Photo, { foreignKey: "user_id", as: "photo" });
PartnerPreferences.belongsTo(User, { foreignKey: "user_id", as: "user" });
User.hasOne(PartnerPreferences, {
  foreignKey: "user_id",
  as: "partnerPreferences",
});
export {
  sequelize,
  User,
  Info,
  Verified,
  Block,
  Report,
  Like,
  Dislike,
  Visit,
  Photo,
  Message,
  Setting,
  Notif,
  Interest,
  Connection,
  PartnerPreferences,
};
