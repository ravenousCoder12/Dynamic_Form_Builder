using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.ComponentModel.DataAnnotations;
using System.Web.Mvc;

namespace FormBuilder_V1.Models
{
    [MetadataType(typeof(UserMetaData))]
    public class UserSignUpVM
    {
       
        


        [Required(ErrorMessage = "Please enter a valid username")]
        //[RegularExpression(UsernameRegex, ErrorMessage = "Username cannot contain whitespaces")]
        [RegularExpression(@"^[a-zA-Z0-9_]+$", ErrorMessage = "Username can only contain alphabets, digits, and underscores.")]
        [StringLength(20,ErrorMessage ="must be between 6 to 20 characters long",MinimumLength =6)]
        public string UserName { get; set; }

        [Required(ErrorMessage = "Please enter your password")]
        [RegularExpression(@"^(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[^a-zA-Z0-9]).+$", ErrorMessage = "Password must contain alteast one digit , alphabet and special character")]
        [StringLength(20, ErrorMessage = "must be between 6 to 20 characters long", MinimumLength = 6)]
        [DataType(DataType.Password)]
        public string Password { get; set; }

        [Required(ErrorMessage = "Please enter confirm password")]
        [DataType(DataType.Password)]
        [System.ComponentModel.DataAnnotations.Compare("Password")]
        
        public string ConfirmPassword { get; set; }

        /*
         [MetadataType(typeof(UserMetaData))]
public partial class User
{
    public int ID { get; set; }
    public string UserName { get; set; }
    public string Password { get; set; }
}

public class UserMetaData
{
    [Remote("IsUserNameAvailable", "Home", HttpMethod = "GET", ErrorMessage = "UserName already in use.")]
    public string UserName { get; set; }
}
         
         
         
         */
    }
    public class UserMetaData
    {
        [Remote("IsUserNameAvailable", "Home", HttpMethod = "GET", ErrorMessage = "UserName already in use.")]
        public string UserName { get; set; }
    }

}