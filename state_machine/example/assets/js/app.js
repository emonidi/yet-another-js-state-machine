function sm(){
    
    var commands  = ['go','stop','getReady'];
    var states = ['red','yellow','green'];
    var defaultMethod = wrongAnswer;
    var context = this.context = new CONTEXT(states,commands,defaultMethod);

    //set startTraffic method for green state
    this.context.setMethod('green','go',function(){
        rightAnswer();
        this.setState('red');
    });

  
    this.context.setMethod('yellow','getReady',function(){
        rightAnswer();
        this.setState('green');
    });
    
    this.context.setMethod('red','stop',function(){
        
        rightAnswer();
        this.setState('yellow');
        
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
        var state = machine.context.currentState();
        state[action]();
        console.log(machine.context.currentState().name);
        setTLClass(machine.context.currentState().name);
    });
});













