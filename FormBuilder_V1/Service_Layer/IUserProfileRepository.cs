using FormBuilder_V1.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FormBuilder_V1.Service_Layer
{
    public interface IUserProfileRepository
    {
        int SaveTemplate(UserSaveTemplateVM template);
        IEnumerable<UserTemplateDetailsVM> GetTemplates(string username);
        UserTemplateHtmlVM GetTemplateHtml(string username, int template_id);
        int DeleteTemplate(int templateID);
    }
}
