module.exports = function(sequelize, DataTypes) {
  let Post = sequelize.define("Post", {
    title: DataTypes.STRING(140)
  });

  Post.associate = function(models) {
    models.Post.belongsTo(models.User, {
      onDelete: "CASCADE",
      foreignKey: {
        allowNull: false
      }
    });
  };

  return Post;
};
