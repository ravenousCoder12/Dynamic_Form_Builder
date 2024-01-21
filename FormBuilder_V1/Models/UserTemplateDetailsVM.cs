using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace FormBuilder_V1.Models
{
    public class UserTemplateDetailsVM
    {
        public int Template_ID { get; set; }
        public string TemplateName { get; set;}
        public DateTime DateAdded { get; set; }
    }
}