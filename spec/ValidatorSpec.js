describe("Validator", function () {
  
  describe("when checking isRequired()", function () {
    it("should indicate that value is valid", function () {
      var name = 'Sirius Black';
      var valid = new Validator(name).isRequired();
      var answer = valid.isValid();
      expect(answer).toBe(true);
    });
      
    it("should indicate that value is undefined", function () {
      var name;      
      var valid = new Validator(name).isRequired(); 
      var answer = valid.isValid();    
      expect(answer).toBe(false);    
    });  
      
    it("should indicate that value is null", function () {
      var name = null;      
      var valid = new Validator(name).isRequired(); 
      var answer = valid.isValid();    
      expect(answer).toBe(false);
    });
      
    it("should indicate that value is empty string", function () {
      var name = '';      
      var valid = new Validator(name).isRequired(); 
      var answer = valid.isValid();    
      expect(answer).toBe(false);
    });  
  });

  describe("when checking maxLength()", function () {
    it("should indicate that string is valid", function () {
      var name = 'Sirius Black';
      var valid = new Validator(name).maxLength(100);
      var answer = valid.isValid();
      expect(answer).toBe(true);
    });
      
    it("should indicate that string is not valid", function () {
      var name = 'ooooo';      
      var valid = new Validator(name).maxLength(2);
      var answer = valid.isValid();    
      expect(answer).toBe(false);    
    });  
  });

  describe("when checking minLength()", function () {
    it("should indicate that string is valid", function () {
      var name = 'Sirius Black';
      var valid = new Validator(name).minLength(5);
      var answer = valid.isValid();
      expect(answer).toBe(true);
    });
      
    it("should indicate that string is not valid", function () {
      var name = 'ooooo';      
      var valid = new Validator(name).minLength(6);
      var answer = valid.isValid();    
      expect(answer).toBe(false);    
    });  
  });

  describe("when checking max()", function () {
    it("should indicate that value is valid", function () {
      var age = 20;
      var valid = new Validator(age).max(20);
      var answer = valid.isValid();
      expect(answer).toBe(true);
    });
      
    it("should indicate that value is not valid", function () {
      var age = 120;
      var valid = new Validator(age).max(100);
      var answer = valid.isValid();    
      expect(answer).toBe(false);    
    });  
  });

  describe("when checking min()", function () {
    it("should indicate that value is valid", function () {
      var age = 20;
      var valid = new Validator(age).min(14);
      var answer = valid.isValid();
      expect(answer).toBe(true);
    });
      
    it("should indicate that value is not valid", function () {
      var age = 12;
      var valid = new Validator(age).min(14);
      var answer = valid.isValid();    
      expect(answer).toBe(false);    
    });  
  });
    
  describe("when checking isEmail()", function () {
    it("should indicate that email is valid", function () {
      var email = 'wolf-star_78@gmail.com';
      var valid = new Validator(email).isEmail();
      var answer = valid.isValid();
      expect(answer).toBe(true);
    });
      
    it("should indicate that email is not valid (wrong structure)", function () {
      var email = 'sdasffsa';
      var valid = new Validator(email).isEmail();
      var answer = valid.isValid();    
      expect(answer).toBe(false);    
    });  
      
    it("should indicate that email is not valid (wrong domain)", function () {
      var email = 'wolfstar78@gmail';
      var valid = new Validator(email).isEmail();
      var answer = valid.isValid();    
      expect(answer).toBe(false);    
    }); 
      
    it("should indicate that email is not valid (not latin)", function () {
      var email = 'вульфстар78@gmail';
      var valid = new Validator(email).isEmail();
      var answer = valid.isValid();    
      expect(answer).toBe(false);    
    });   
  });

  describe("when checking isInt()", function () {
    it("should indicate that 20 is number", function () {
      var age = 20;
      var valid = new Validator(age).isInt();
      var answer = valid.isValid();
      expect(answer).toBe(true);
    });
      
    it("should indicate that 3.14 is number", function () {
      var age = 3.14;
      var valid = new Validator(age).isInt();
      var answer = valid.isValid();    
      expect(answer).toBe(true);    
    });  
    
    it("should indicate that string is not number", function () {
      var age = '20';
      var valid = new Validator(age).isInt();
      var answer = valid.isValid();    
      expect(answer).toBe(false);    
    });    
  });

  describe("when checking posibility to chain rules together", function () {

    it("should indicate that value is valid for all rules", function () {
      var name = 'Sirius Black';
      var valid = new Validator(name).maxLength(100).minLength(5).isRequired();
      var answer = valid.isValid();
      expect(answer).toBe(true);
    });
      
    it("should indicate that value is not valid (bc of last rule)", function () {
       var name = 'Sirius Black';
      var valid = new Validator(name).minLength(5).isRequired().isEmail();
      var answer = valid.isValid();    
      expect(answer).toBe(false);    
    });  
    
    it("should indicate that value is not valid (not bc of last rule)", function () {
      var age = 20;
      var valid = new Validator(age).isInt().min(30).max(40);
      var answer = valid.isValid();    
      expect(answer).toBe(false);    
    });    
    

    it("should indicate that value is not valid (bc of more that one rule)", function () {
      var name = 'Sirius Black';
      var valid = new Validator(name).maxLength(100).minLength(30).isEmail();
      var answer = valid.isValid();    
      expect(answer).toBe(false);    
    });          
  });
    
    
});
