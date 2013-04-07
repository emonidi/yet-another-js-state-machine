var CONTEXT = function(states,methods,defaultMethod){
    var Super = this;
    Super._currentState = '';
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
    
    Super.getStateByName = function(stateName){
         for(var i in Super.states){
            if(Super.states[i].name === stateName){
                return Super.states[i];
            }
        }
    }
    
    Super.getCurrentState = function(){
        return Super._currentState;
    }


    for(var i = 0 ; i < states.length; i++){
         var self = this;
        Super.statesCount = i+1;
        Super.states[states[i]] = new Object();
        Super.states[states[i]]['setState'] = function(state){
           Super.currentState = Super._currentState = Super.getStateByName(state);
            return Super.currentState;
        }
        Super.states[states[i]]['index'] = i;
        if(i === 0){
            Super._currentState = Super.states[states[i]];
            Super._currentState.initial = true;
        }
        Super.states[states[i]]['name'] = states[i];
        for(var j in methods){
            Super.states[states[i]][methods[j]] = Super.defaultMethod;

        }

    }

    //PUBLIC METHODS
    return {
        currentState: function(){
            return Super.getCurrentState();
        },
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
                    self.currentState = Super._currentState = Super.getStateByIndex(1);
                    break;
                case Super.statesCount-1:
                    self.currentState = Super._currentState = Super.getStateByIndex(0);
                    break;
                default :
                    self.currentState = Super._currentState = Super.getStateByIndex(Super.currentState.index+1);
            }
           
        }
    }
}


