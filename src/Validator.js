function Validator(value){
  this.value=value;
  this.rules=[];    
}

Validator.prototype.isRequired = function() {
  this.rules.push(function(value){
    return !(value === undefined || value === null || value === '') 
  });    
  return this;
};

Validator.prototype.maxLength = function(length) {
  this.rules.push(function(value){
      return (value.length <= length)
  })
  return this;
};
    
Validator.prototype.minLength = function(length) {
  this.rules.push(function(value){
      return (value.length >= length)
  })
  return this;
};
   
Validator.prototype.max = function(length) {
  this.rules.push(function(value){
    return (value <= length);  
  })
  return this;
};

Validator.prototype.min = function(length) {
  this.rules.push(function(value){
    return (value >= length);  
  })
  return this;
};

Validator.prototype.isEmail = function() {
  this.rules.push(function(value){
    var r = /^[\w\.-]+@[\w\.-]+\.\w{2,4}$/i;  
    return (value.search(r) !== -1) 
  });
  return this;  
};
    
Validator.prototype.isInt = function() {
  this.rules.push(function(value){
    return (typeof(value) === 'number')
  });
  return this;  
};

Validator.prototype.isValid = function() {
  var answ = true;
  var i;    
    
  for (i = 0; i < this.rules.length; i++) {
    var answer = this.rules[i](this.value);
    if (!answer) answ = false;  
  }
    
  return answ;    
}
