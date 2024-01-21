using FormBuilder_V1.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FormBuilder_V1.Service_Layer
{
    public interface ISessionRepository
    {
        int CreateUser(UserSignInVM user);
        int ValidateUser(UserSignInVM user);

        //signout

        int RemoteValidate(string username);

    }
}
