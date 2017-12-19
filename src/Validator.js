function Validator(value){
  this.value=value;
  this.rules={};  
}

Validator.prototype.isRequired = function() {
  this.rules.isRequired = true;
    
  return this;
};
    
Validator.prototype.maxLength = function(length) {
  this.rules.maxLength = length;
    
  return this;
};
    
Validator.prototype.minLength = function(length) {
  this.rules.minLength = length;
    
  return this;
};
    
Validator.prototype.max = function(length) {
  this.rules.max = length;
    
  return this;  
};

Validator.prototype.min = function(length) {
  this.rules.min = length;
    
  return this;
};
  
Validator.prototype.isEmail = function() {
  this.rules.isEmail = true;
    
  return this;  
};
    
Validator.prototype.isInt = function() {
  this.rules.isInt = true;
    
  return this;  
};

Validator.validate = function(arr) {
  var answ={};
    
  for (var param in arr) {
    answ[param] = {validation: true, };    
    
    if ('isRequired' in arr[param].rules)   {
      if (arr[param].value === undefined || arr[param].value === null || arr[param].value === '') {
        answ[param] = {validation: false, msg:"Параметр не должен быть пустым",}
      }     
    }    
        
    if ('maxLength' in arr[param].rules) {
      if (arr[param].value.length > arr[param].rules.maxLength) {
        answ[param] = {validation: false, msg:"Строка должна быть короче "+arr[param].rules.maxLength};
      }
    }     
        
    if ('minLength' in arr[param].rules) {
      if (arr[param].value.length < arr[param].rules.minLength) {
        answ[param] = {validation: false, msg:"Строка должна быть не короче "+arr[param].rules.minLength};}
    }    
        
    if ('max' in arr[param].rules) {
      if (arr[param].value > arr[param].rules.max) {
        answ[param] = {validation: false, msg:"Значение должно быть меньше "+arr[param].rules.max};
      }
    } 
 
    if ('min' in arr[param].rules) {
      if (arr[param].value < arr[param].rules.min) {
        answ[param] = {validation: false, msg:"Значение должно быть больше "+arr[param].rules.min};
      }
    }     
    
    if ('isEmail' in arr[param].rules) {
      var r = /^[\w\.\d-_]+@[\w\.\d-_]+\.\w{2,4}$/i;
      if (!arr[param].value.match(r)) {
        answ[param] ={validation: false, msg:"Некоректный email",};
      }     
    }   
 
    if ('isInt' in arr[param].rules)   {
    //  integerRegex = /^\-?[0-9]+$/    
      if (typeof(arr[param].value) !== 'number') {
        answ[param] ={validation: false, msg:"Значение должно быть числом",};
      } 
    }
  }
    
  return answ;
};