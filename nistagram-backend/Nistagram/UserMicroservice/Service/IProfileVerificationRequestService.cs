using Microsoft.AspNetCore.Http;
using ProfileMicroservice.Model;
using ProfileMicroservice.Service;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace UserMicroservice.Service
{
    public interface IProfileVerificationRequestService : IService<ProfileVerificationRequest>
    {
        Task<string> SaveImage(IFormFile imageFile);
    }
}
