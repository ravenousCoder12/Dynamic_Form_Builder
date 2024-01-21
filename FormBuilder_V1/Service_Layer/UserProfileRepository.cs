using Dapper;
using FormBuilder_V1.Models;
using System;
using System.Collections.Generic;
using System.Configuration;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Web;

namespace FormBuilder_V1.Service_Layer
{
    public class UserProfileRepository : IUserProfileRepository
    {
        //establishing the connection string
        static readonly string conStr = ConfigurationManager.ConnectionStrings["ConnString"].ToString();
        SqlConnection conn = new SqlConnection(conStr);

        UserTemplateHtmlVM IUserProfileRepository.GetTemplateHtml(string username, int template_id)
        {
            conn.Open();
            UserTemplateHtmlVM code = SqlMapper.Query<UserTemplateHtmlVM>(conn, "exec UserProfile_GetTemplateHtml "+template_id+","+username).ToList().FirstOrDefault();

            conn.Close();
            return code;
        }

        IEnumerable<UserTemplateDetailsVM> IUserProfileRepository.GetTemplates(string username) 
        {
            conn.Open();
            List<UserTemplateDetailsVM> result = SqlMapper.Query<UserTemplateDetailsVM>(conn, "exec UserProfile_GetTemplateDetails "+username).ToList();
            
            conn.Close();
            return result;
        }

        int IUserProfileRepository.SaveTemplate(UserSaveTemplateVM template)
        {
            try
            {
                conn.Open();

                var parameters = new DynamicParameters();
                parameters.Add("username", template.username);
                parameters.Add("templatename", template.templatename);
                parameters.Add("templatecode", template.templatecode);
                

                var res =  conn.Execute("UserProfile_saveTemplate", parameters, commandType: CommandType.StoredProcedure);

               

                conn.Close();
                return res;



            }
            catch (Exception ex)
            {
                throw;
            }
        }
        int IUserProfileRepository.DeleteTemplate(int templateID)
        {
            try
            {
                conn.Open();

                var parameters = new DynamicParameters();
                parameters.Add("template_id", templateID);

                var result = conn.Execute("UserProfile_DeleteTemplate", parameters, commandType: CommandType.StoredProcedure);

                conn.Close();
                return result;
            }
            catch (Exception ex)
            {
                throw;
            }
        }
    }
}