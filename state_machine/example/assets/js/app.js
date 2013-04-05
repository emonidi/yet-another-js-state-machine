function sm(){
    var commands  = ['go','stop','getReady'];
    var states = ['red','yellow','green'];
    var defaultMethod = wrongAnswer;
    this.context = new CONTEXT(states,commands,defaultMethod);

    //set startTraffic method for green state
    this.context.setMethod('green','go',function(){
        rightAnswer();
    });

    this.context.setMethod('red','stop',function(){
        rightAnswer();
    });

    this.context.setMethod('yellow','getReady',function(){
        rightAnswer();
    });


    setTLClass(states[0]);

}

function  setTLClass(cls){
    $("#tl").removeAttr('class').addClass(cls);
}


function rightAnswer(){
    $(".answer").removeClass('correct');
    $(".answer").removeClass('wrong');
    $(".answer").addClass('correct');
}

function wrongAnswer(){
    $(".answer").removeClass('correct');
    $(".answer").removeClass('wrong');
    $(".answer").addClass('wrong');
}


$(document).ready(function(){
    var machine = new sm();
    $('button').click(function(){
        var action = $(this).data('action');
        machine.context.currentState[action]();
        machine.context.setNextState();
        setTLClass(machine.context.currentState.name);
    });
});













