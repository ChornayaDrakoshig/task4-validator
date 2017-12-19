describe("Validator", function () {

  it("should test multiple fields", function () {
    var name = 'Sirius Black';
    var age = '15';
    var valid1 = new Validator(name).minLength(3);
    var valid2 = new Validator(age).isInt();
    var answer = Validator.validate({str: valid1, num: valid2});
    expect(answer.str.validation).toBe(true);
    expect(answer.num.validation).toBe(false);
  });
    
  describe("when checking strings", function () {

    it("should indicate that the string is valid", function () {
      var name = 'Sirius Black';
      var valid = new Validator(name).isRequired().minLength(3).maxLength(200);
      var answer = Validator.validate({str: valid});
      expect(answer.str.validation).toBe(true);
    });
      
    it("should indicate that the string is too short", function () {
      var name = 'aa';      
      var valid = new Validator(name).minLength(3); 
      var answer = Validator.validate({str: valid});    
      expect(answer.str.validation).toBe(false);    
    });  
      
    it("should indicate that the string is too long", function () {
      var name = 'Sirius Black';      
      var valid = new Validator(name).maxLength(10); 
      var answer = Validator.validate({str: valid});    
      expect(answer.str.validation).toBe(false);    
    });
      
    it("should indicate that the string is empty", function () {
      var name = '';      
      var valid = new Validator(name).isRequired(); 
      var answer = Validator.validate({str: valid});    
      expect(answer.str.validation).toBe(false);    
    });  
  });

  describe("when checking emails", function () {

    it("should indicate that the email is valid", function () {
      var email = 'wolfstar99@smth.com';     
      var valid = new Validator(email).isRequired().minLength(3).maxLength(200); 
      var answer = Validator.validate({str: valid});    
      expect(answer.str.validation).toBe(true);    
    });
      
    it("should indicate that the email is unvalid (wrong symbols)", function () {
      var email = 'вульфстар@smth.com';     
      var valid = new Validator(email).isEmail(); 
      var answer = Validator.validate({str: valid});    
      expect(answer.str.validation).toBe(false);    
    });  
      
    it("should indicate that the string is unvalid (wrong structure)", function () {
      var email = 'aaaaaaaaaaaa';      
      var valid = new Validator(email).isEmail(); 
      var answer = Validator.validate({str: valid});    
      expect(answer.str.validation).toBe(false);    
    });
      
    it("should indicate that the string is empty", function () {
      var email = '';      
      var valid = new Validator(email).isRequired(); 
      var answer = Validator.validate({str: valid});    
      expect(answer.str.validation).toBe(false);    
    });  
  });
    
  describe("when checking numbers", function () {

    it("should indicate that the number is valid", function () {
      var age = 15;      
      var valid = new Validator(age).isInt().min(0).max(100); 
      var answer = Validator.validate({str: valid});    
      expect(answer.str.validation).toBe(true);    
    });
      
    it("should indicate that -15 < 0", function () {
      var age = -15;      
      var valid = new Validator(age).min(0);  
      var answer = Validator.validate({str: valid});    
      expect(answer.str.validation).toBe(false);    
    });  
      
    it("should indicate that 800 > 100", function () {
      var age = 800;      
      var valid = new Validator(age).max(100); 
      var answer = Validator.validate({str: valid});    
      expect(answer.str.validation).toBe(false);    
    });
      
    it("should indicate that it is number", function () {
      var age = '30';      
      var valid = new Validator(age).isInt(); 
      var answer = Validator.validate({str: valid});    
      expect(answer.str.validation).toBe(false);    
    });  
  });     
});
