class Auth {
    static sessionState = Object.freeze({"logOff":0, "logOn":1, "endSession":2, "overlapSession":3});
    #id;
    #name;
    #state;
    constructor(){
        this.#state=sessionState.logOff;
    }
    state(){
        return this.#state;
    }
}
