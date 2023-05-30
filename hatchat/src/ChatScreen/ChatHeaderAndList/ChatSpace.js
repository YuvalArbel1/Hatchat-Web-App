import HeaderBox from "./HeaderBox";
import UserImageLeftTopCorner from "./UserImageLeftTopCorner";
import NavIcons from "./NavIcons";
import SearchInput from "./SearchInput";
import ListGroupOfContacts from "./ListGroupOfContacts.";

function ChatSpace({   currentUsernameAndToken,
                       handleLogout,
                       activeUser,
                       handleSearch,
                       addContact,
                       filteredContacts,
                       handleContactSwitch}) {

    return (
        <>
            <div className="col-md-3 g-0 chatScreen">
                <HeaderBox>
                    <UserImageLeftTopCorner activeUser={activeUser}/>
                    <NavIcons currentUsernameAndToken={currentUsernameAndToken} handleLogout={handleLogout} filteredContacts={filteredContacts} addContact={addContact} />
                </HeaderBox>
                <SearchInput handleSearch={handleSearch}/>
                <ListGroupOfContacts handleContactSwitch={handleContactSwitch} filteredContacts={filteredContacts}/>
            </div>
        </>
    );
}

export default ChatSpace;
