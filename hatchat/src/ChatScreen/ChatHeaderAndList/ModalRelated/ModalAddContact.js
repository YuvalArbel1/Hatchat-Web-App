import React, {useState} from "react";
import ModalInputIdOrName from "./ModalInputIdOrName";
import AddContactBtn from "./AddContactBtn";
import CloseModalBtn from "./CloseModalBtn";
import ModalTitle from "./ModalTitle";

function ModalAddContact({currentUsernameAndToken, addContact, filteredContacts}) {
    const [index, setIndex] = useState(0);

    const [contactData, setContactData] = useState({
        id: null,
        name: "",
        bio: "",
        lastSeen: new Date().toLocaleString("en-US", {
            month: "long",
            day: "numeric",
            hour: "numeric",
            minute: "numeric",
            hour12: true,
        }),
        profilePic: "",
    });


    async function handleAddChatToServer() {
        const data = {
            "username": contactData.name
        };

        const res = await fetch('http://localhost:5000/api/Chats', {
            'method': 'post',
            'headers': {
                'Content-Type': 'application/json',
                'Authorization': currentUsernameAndToken.token,
            },
            'body': JSON.stringify(data)
        });

        if (res.ok) {
            const responseData = await res.json();
            console.log("adding user res: ", responseData);
            alert("adding ok.");
            // Update the contactData properties with the received data
            setContactData(prevData => ({
                ...prevData,
                id: responseData.id,
                // profilePic: responseData.user.profilePic,
                name: responseData.username,
                profilePic: responseData.profilePic,
            }));

        } else {
            const responseData = await res.json();
            console.log("adding user res: ", responseData);
            alert("Error during adding");
        }
    }

    const handleChange = (event) => {
        event.preventDefault();
        const {name, value} = event.target;
        setContactData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleAddContact = () => {


        const res = handleAddChatToServer();

        if (
            contactData.name === "" ||
            contactData.id === null ||
            contactData.id === -1 ||
            !isNumber(contactData.id)
        ) {
            return;
        }

        // Check if contact ID already exists
        const existingContact = filteredContacts.find(
            (contact) => contact.id === contactData.id
        );

        if (existingContact) {
            console.log("contact already exist");
            return;
        }

        // Assign the loaded image to the profilePic property
        addContact(contactData);
        // Reset the input fields
        setContactData({
            id: null,
            name: "",
            bio: "Hello",
            lastSeen: new Date().toLocaleString("en-US", {
                month: "long",
                day: "numeric",
                hour: "numeric",
                minute: "numeric",
                hour12: true,
            }),
            profilePic: "",
        });
    };

    const isNumber = (value) => {
        return /^\d+$/.test(value);
    };

    return (
        <>
            <ModalTitle/>
            <div className="modal-body">
                <ModalInputIdOrName
                    label="Contact's name"
                    placeholder="Contact's name"
                    name="name"
                    value={contactData.name}
                    onChange={handleChange}
                />
            </div>
            <div className="modal-footer">
                <CloseModalBtn/>
                <AddContactBtn handleAddContact={handleAddContact}/>
            </div>
        </>
    );
}

export default ModalAddContact;
