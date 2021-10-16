using Microsoft.AspNetCore.Identity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace JwtBearerAuthorization.Data.Identity
{
    public class AppUser : IdentityUser<long>
    {
        public virtual ICollection<AppUserRole> UserRoles { get; set; }
        public string Firstname { get; set; }
        public string Lastname { get; set; }
        public string PhoneOwn { get; set; }
        public string Image { get; set; }
    }
}
