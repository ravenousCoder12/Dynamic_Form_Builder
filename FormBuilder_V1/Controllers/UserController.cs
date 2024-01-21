using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

using FormBuilder_V1.Models;
using FormBuilder_V1.Security;
using FormBuilder_V1.Service_Layer;

namespace FormBuilder_V1.Controllers
{ 
    [GuardFilter]
    public class UserController : Controller
    {
        IUserProfileRepository profileRepo = new UserProfileRepository();

        // GET: User
        public ActionResult CreateForm()
        {

            return View();
        }
        [HttpPost]
        
        public JsonResult SaveForm(string name, string html)
        {
            UserSaveTemplateVM obj = new UserSaveTemplateVM()
            {
                username = Convert.ToString(Session["UserName"]),
                templatename = name,
                templatecode = html

            };
            int res = profileRepo.SaveTemplate(obj);
            if (res !=0) 
            { 
                //success
            }
            else
            {
                //fail
            }
            return Json("success", JsonRequestBehavior.AllowGet);
        }

        public ActionResult UserProfile()
        {
            var templates = profileRepo.GetTemplates(Convert.ToString(Session["UserName"]));
            return View(templates);
        }

        public ActionResult SignOut()
        {
            Session.Abandon();
            return RedirectToAction("LandingPage","Home");
        }
        public JsonResult GetHtml(int id)
        {
            //retrieve the html code from the db

            var obj = profileRepo.GetTemplateHtml(Convert.ToString(Session["UserName"]), id);

            
            return Json(obj, JsonRequestBehavior.AllowGet);
        }


        [HttpPost]
        public JsonResult DeleteTemplate(int id)
        {
            int result = profileRepo.DeleteTemplate(id);

            if (result > 0)
            {
                // Success
                return Json("success", JsonRequestBehavior.AllowGet);
            }
            else
            {
                // Fail
                return Json("fail", JsonRequestBehavior.AllowGet);
            }
        }
    }
}