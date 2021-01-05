import UserProfileIcone from "../UserProfileIcone/UserProfileIcone";

const SearchCard = ({ id, username }) => {
  return (
    <div className="search-card-container">
      <UserProfileIcone id={id} size={60} />
      <p>{username}</p>
    </div>
  );
};

export default SearchCard;
