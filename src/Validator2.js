function Rule() {
  this.rules = [];
}

Rule.prototype.isRequired = function() {
  this.rules.push(function(value){
    return !(value === undefined || value === null || value === '') 
  });
  return this;    
}

Rule.prototype.maxLength = function(length) {
  this.rules.push(function(value){
      return (value.length <= length)
  })
  return this;
};
    
Rule.prototype.minLength = function(length) {
  this.rules.push(function(value){
      return (value.length >= length)
  })
  return this;
};
   
Rule.prototype.max = function(length) {
  this.rules.push(function(value){
    return (value <= length);  
  })
  return this;
};

Rule.prototype.min = function(length) {
  this.rules.push(function(value){
    return (value >= length);  
  })
  return this;
};

Rule.prototype.isEmail = function() {
  this.rules.push(function(value){
    var r = /^[\w\.-]+@[\w\.-]+\.\w{2,4}$/i;  
    return (value.search(r) !== -1) 
  });
  return this;  
};
    
Rule.prototype.isInt = function() {
  this.rules.push(function(value){
    return (typeof(value) === 'number')
  });
  return this;  
};

function Validator(){
  this.isValid = function(values, rules) {
    var answ={};
     
    for (var param in values) {    
      answ[param] = true; 
      var i;    
        
      for (i=0; i<rules[param].rules.length; i++) {  
        var answer = rules[param].rules[i](values[param]); 
        if (!answer) answ[param] = false;    
      }    
    }
    return answ;  
  }
}