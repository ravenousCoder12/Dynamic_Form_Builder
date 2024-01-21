using Dapper;
using FormBuilder_V1.Models;
using System;
using System.Configuration;
using System.Data.SqlClient;
using System.Data;

namespace FormBuilder_V1.Service_Layer
{

    public class SessionRepository : ISessionRepository
    {
        static readonly string conStr = ConfigurationManager.ConnectionStrings["ConnString"].ToString();
        SqlConnection conn = new SqlConnection(conStr);
        int ISessionRepository.CreateUser(UserSignInVM user)
        {
            try
            {
                conn.Open();



                int res = conn.Execute("UserCredentials_Insert", user, commandType: System.Data.CommandType.StoredProcedure);
                conn.Close();
                return res;
            }
            catch (Exception ex)
            {
                throw;
            }
        }



        int ISessionRepository.ValidateUser(UserSignInVM user)
        {
            try
            {
                conn.Open();

                var parameters = new DynamicParameters();
                parameters.Add("username", user.UserName);
                parameters.Add("password", user.Password);
                parameters.Add("res", dbType: DbType.Int32, direction: ParameterDirection.Output);

                conn.Execute("UserCredentials_Validate", parameters, commandType: CommandType.StoredProcedure);

                var res = parameters.Get<int>("res");

                conn.Close();
                return res;



            }
            catch (Exception ex)
            {
                throw;
            }
        }
        int ISessionRepository.RemoteValidate(string username)
        {
            try
            {
                conn.Open();

                var parameters = new DynamicParameters();
                parameters.Add("username", username);

                parameters.Add("ress", dbType: DbType.Int32, direction: ParameterDirection.Output);

                conn.Execute("UserCredentials_RemoteValidation", parameters, commandType: CommandType.StoredProcedure);

                var res = parameters.Get<int>("ress");

                conn.Close();
                return res;



            }
            catch (Exception ex)
            {
                throw;
            }
        }
    }
}