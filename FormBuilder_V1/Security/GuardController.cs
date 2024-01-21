using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using System.Web.Mvc.Filters;

namespace FormBuilder_V1.Security
{
    public class GuardFilter : ActionFilterAttribute, IAuthenticationFilter
    {
        void IAuthenticationFilter.OnAuthentication(AuthenticationContext filterContext)
        {
            if(string.IsNullOrEmpty(Convert.ToString(filterContext.HttpContext.Session["UserName"])))
            {
                filterContext.Result=new HttpUnauthorizedResult();
            }
        }

        void IAuthenticationFilter.OnAuthenticationChallenge(AuthenticationChallengeContext filterContext)
        {
            if (filterContext.Result == null || filterContext.Result is HttpUnauthorizedResult)
            {
                filterContext.Result = new RedirectResult("~/Home/Index");
            }
        }
    }

    public class AccessFilter : ActionFilterAttribute, IAuthenticationFilter
    {
        void IAuthenticationFilter.OnAuthentication(AuthenticationContext filterContext)
        {
            //This function will be executed before the controller loads into the memory
            //if session is not null--redirect to index when requesting loginValidate
            if (!string.IsNullOrEmpty(Convert.ToString(filterContext.HttpContext.Session["UserName"])))
            {
                filterContext.Result = new RedirectResult("~/User/CreateForm");
            }



        }

        void IAuthenticationFilter.OnAuthenticationChallenge(AuthenticationChallengeContext filterContext)
        {
        }
    }
}