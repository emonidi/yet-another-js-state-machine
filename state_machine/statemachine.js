var CONTEXT = function(states,methods,defaultMethod){
    var Super = this;
    Super.currentState = '';
    Super.states = {};
    Super.statesCount = 0;

    Super.defaultMethod = defaultMethod;
    Super.error = function(errorMsg){
        console.error();
    }
    Super.getStateByIndex = function(index){
        for(var i in Super.states){
            if(Super.states[i].index === index){
                return Super.states[i];
            }
        }
    }





    for(var i = 0 ; i < states.length; i++){
        Super.statesCount = i+1;
        Super.states[states[i]] = new Object();
        Super.states[states[i]]['index'] = i;
        if(i === 0){
            Super.currentState = Super.states[states[i]];
            Super.currentState.initial = true;
        }
        Super.states[states[i]]['name'] = states[i];
        for(var j in methods){
            Super.states[states[i]][methods[j]] = Super.defaultMethod;

        }

    }

    //PUBLIC METHODS
    return {
        currentState: Super.currentState,
        getMethodFromCurrentState:function(method){

            return Super.currentState[method]();
        },
        setMethod:function(state,method,callback){
            if(Super.states[state][method]){
                Super.states[state][method] = callback;
            }else{
                Super.error("Method '"+method+"' is not defined in initialization.Check if it is in the methods array.")
            }
        },
        setNextState:function(){
            var self = this;
            switch (Super.currentState.index){
                case 0:
                    console.log()
                    self.currentState = Super.currentState = Super.getStateByIndex(1);
                    break;
                case Super.statesCount-1:
                    self.currentState = Super.currentState = Super.getStateByIndex(0);
                    break;
                default :
                    self.currentState = Super.currentState = Super.getStateByIndex(Super.currentState.index+1);
            }
            console.log(Super.currentState);
        }
    }
}



