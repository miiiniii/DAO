import axios from 'axios'; // 액시오스
import TEST_IP from './setTestIp';


const chatAPI = {
    getMessages: (groupId, callback) => {
        console.log("Calling get messages from API");
        axios(
            {
                url: `/api/kafka/messages/${groupId}`,
                method: 'post',
                baseURL: 'http://' + TEST_IP + ':8080',
                withCredentials: true,
            }
        ).then(function (response) {
            callback(response.data);
        }).catch((e) => console.log(e));
    },

    sendMessage: (username, contentType, text, callback) => {
        let msg = {
            author: username,
            contentType: contentType,
            content: text,
        };
        axios(
            {
                url: `/api/kafka/publish`,
                method: 'post',
                data: msg,
                baseURL: 'http://' + TEST_IP + ':8080',
                contentType: "allpication/json",
                dataType: "json",
                withCredentials: true,
            }
        ).then(function (response) {
            callback(response.data);
        }).catch((e) => console.log(e));
    },
};

export default chatAPI;