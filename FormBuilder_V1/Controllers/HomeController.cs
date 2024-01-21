using FormBuilder_V1.Service_Layer;
using FormBuilder_V1.Models;
using FormBuilder_V1.Security;
using System;
using System.Web.Mvc;

namespace FormBuilder_V1.Controllers
{
    [AccessFilter]
    public class HomeController : Controller
    {
        ISessionRepository sessionRepo = new SessionRepository();

        public ActionResult LandingPage()
        {
            return View();
        }
      
        [HttpGet]
        public ActionResult Index()
        {
            return View();
        }

        [HttpPost]

        public ActionResult Index(UserSignInVM user, string submit)
        {
            if (ModelState.IsValid)
            {
                if (submit == "Sign In")
                {
                    var res = sessionRepo.ValidateUser(user);
                    if (res == 1)
                    {
                        Session["UserName"] = user.UserName;
                        return RedirectToAction("CreateForm", "User");
                    }
                    else
                    {
                        ViewData["isValidated"] = "Invalid";
                        ModelState.Clear();
                        return View();
                    }
                }
                if (submit == "Sign Up")
                {
                    var rowsAffected = sessionRepo.CreateUser(user);
                    if (rowsAffected == 1)
                    {
                        ModelState.Clear();
                        return View();
                    }

                }

            }


            return View();
        }

        [HttpGet]
        public ActionResult SignIn()
        {
            return View();
        }

        //[HttpPost]
        //public ActionResult SignIn(UserViewModel user)
        //{
        //    if(ModelState.IsValid)
        //    {
        //        var res = userRepo.ValidateUser(user);
        //        if (res == 1)
        //        {
        //            Session["UserName"] = user.UserName;
        //            return RedirectToAction("Home", "User");
        //        }
        //        else
        //        {
        //            ViewBag.isValidated = false;
        //            ModelState.Clear();
        //            return View();
        //        }
        //    }
        //    return View();
        //}
        [HttpGet]
        public ActionResult SignUp()
        {
            return View();
        }
        //[HttpPost]
        //public ActionResult SignUp(UserViewModel user)
        //{
        //    return View();
        //}
        //public bool IsUserNameAvailable(string UserName)
        //{

        //}

        [HttpGet]
        public JsonResult IsUserNameAvailable(string username)
        {
            var res = sessionRepo.RemoteValidate(username);
            if (res == 0)
            {

                return Json(true, JsonRequestBehavior.AllowGet);
            }

            else
            {

                return Json(false, JsonRequestBehavior.AllowGet);
            }


        }

    }
}