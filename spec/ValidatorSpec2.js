describe("Validator", function () {
  
  describe("when checking isRequired()", function () {
    it("should indicate that value is valid", function () {
        
      var name = 'Sirius Black';
      var age = 18;
      var rule1 = new Rule().isRequired();
      var rule2 = new Rule().isRequired();    
        
      var answer = new Validator().isValid({name: name, age: age},{name: rule1, age: rule2});
      expect(answer.name).toBe(true);
      expect(answer.age).toBe(true);    
    });
      
    it("should indicate that value is undefined", function () {
      var name;     
      var rule1 = new Rule().isRequired();    
      var answer = new Validator().isValid({name: name},{name: rule1});
      expect(answer.name).toBe(false);
    });  
      
    it("should indicate that value is null", function () {
      var name = null;      
      var rule1 = new Rule().isRequired();    
      var answer = new Validator().isValid({name: name},{name: rule1});
      expect(answer.name).toBe(false);
    });
      
    it("should indicate that value is empty string", function () {
      var name = '';      
      var rule1 = new Rule().isRequired();    
      var answer = new Validator().isValid({name: name},{name: rule1});
      expect(answer.name).toBe(false);
    });  
  });

  describe("when checking maxLength()", function () {
    it("should indicate that string is valid", function () {
      var name = 'Sirius Black';
      var rule1 = new Rule().maxLength(100);  
      var answer = new Validator().isValid({name: name},{name: rule1});
      expect(answer.name).toBe(true);
    });
      
    it("should indicate that string is not valid", function () {
      var name = 'ooooo';      
      var rule1 = new Rule().maxLength(2);      
      var answer = new Validator().isValid({name: name},{name: rule1});
      expect(answer.name).toBe(false);    
    });  
  });

  describe("when checking minLength()", function () {
    it("should indicate that string is valid", function () {
      var name = 'Sirius Black';
      var rule1 = new Rule().minLength(5);      
      var answer = new Validator().isValid({name: name},{name: rule1});
      expect(answer.name).toBe(true);
    });
      
    it("should indicate that string is not valid", function () {
      var name = 'ooooo';    
      var rule1 = new Rule().minLength(6);      
      var answer = new Validator().isValid({name: name},{name: rule1});  
      expect(answer.name).toBe(false);    
    });  
  });

  describe("when checking max()", function () {
    it("should indicate that value is valid", function () {
      var age = 20;
      var rule1 = new Rule().max(20);
      var answer = new Validator().isValid({age: age},{age: rule1});  
      expect(answer.age).toBe(true);
    });
      
    it("should indicate that value is not valid", function () {
      var age = 120;
      var rule1 = new Rule().max(100);    
      var answer = new Validator().isValid({age: age},{age: rule1});  
      expect(answer.age).toBe(false);    
    });  
  });

  describe("when checking min()", function () {
    it("should indicate that value is valid", function () {
      var age = 20;
      var rule1 = new Rule().min(14);        
      var answer = new Validator().isValid({age: age},{age: rule1});  
      expect(answer.age).toBe(true);
    });
      
    it("should indicate that value is not valid", function () {
      var age = 12;
      var rule1 = new Rule().min(14);        
      var answer = new Validator().isValid({age: age},{age: rule1});  
      expect(answer.age).toBe(false);    
    });  
  });
    
  describe("when checking isEmail()", function () {
    it("should indicate that email is valid", function () {
      var email = 'wolfstar78@gmail.com';
      var rule1 = new Rule().isEmail();   
      var answer = new Validator().isValid({email: email},{email: rule1});      
      expect(answer.email).toBe(true);
    });
      
    it("should indicate that email is not valid (wrong structure)", function () {
      var email = 'sdasffsa';
      var rule1 = new Rule().isEmail();       
      var answer = new Validator().isValid({email: email},{email: rule1});      
      expect(answer.email).toBe(false);    
    });  
      
    it("should indicate that email is not valid (wrong domain)", function () {
      var email = 'wolfstar78@gmail';
      var rule1 = new Rule().isEmail();       
      var answer = new Validator().isValid({email: email},{email: rule1});      
      expect(answer.email).toBe(false);    
   }); 
      
    it("should indicate that email is not valid (not latin)", function () {
      var email = 'вульфстар78@gmail';
      var rule1 = new Rule().isEmail();       
      var answer = new Validator().isValid({email: email},{email: rule1});      
      expect(answer.email).toBe(false);    
    });   
  });

  describe("when checking isInt()", function () {
    it("should indicate that 20 is number", function () {
      var age = 20;
      var rule1 = new Rule().isInt();
      var answer = new Validator().isValid({age: age},{age: rule1});          
      expect(answer.age).toBe(true);
    });
      
    it("should indicate that 3.14 is number", function () {
      var age = 3.14;
      var rule1 = new Rule().isInt();
      var answer = new Validator().isValid({age: age},{age: rule1});          
      expect(answer.age).toBe(true);    
    });  
    
    it("should indicate that string is not number", function () {
      var age = '20';
      var rule1 = new Rule().isInt();
      var answer = new Validator().isValid({age: age},{age: rule1});          
      expect(answer.age).toBe(false);    
    });    
  });

  describe("when checking posibility to chain rules together", function () {

    it("should indicate that value is valid for all rules", function () {
      var name = 'Sirius Black';
      var rule1 = new Rule().maxLength(100).minLength(5).isRequired();
      var answer = new Validator().isValid({name: name},{name: rule1});          
      expect(answer.name).toBe(true);
    });
      
    it("should indicate that value is not valid (bc of last rule)", function () {
      var name = 'Sirius Black';
      var rule1 = new Rule().minLength(5).isRequired().isEmail();
      var answer = new Validator().isValid({name: name},{name: rule1});          
      expect(answer.name).toBe(false);
    });  
    
    it("should indicate that value is not valid (not bc of last rule)", function () {
      var age = 20;
      var rule1 = new Rule().isInt().min(30).max(40);
      var answer = new Validator().isValid({age: age},{age: rule1});          
      expect(answer.age).toBe(false);    
    });    
    

    it("should indicate that value is not valid (bc of more that one rule)", function () {
      var name = 'Sirius Black';
      var rule1 = new Rule().maxLength(100).minLength(30).isEmail();
      var answer = new Validator().isValid({name: name},{name: rule1});          
      expect(answer.name).toBe(false);    
    });          
  });
    
    
});
