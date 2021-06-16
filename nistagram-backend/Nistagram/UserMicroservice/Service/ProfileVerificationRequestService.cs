using Microsoft.AspNetCore.Http;
using ProfileMicroservice.Model;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using UserMicroservice.Repository;

namespace UserMicroservice.Service
{
    public class ProfileVerificationRequestService : IProfileVerificationRequestService
    {
        private IProfileVerificationRequestRepository _profileVerificationRequestRepository;

        public ProfileVerificationRequestService(IProfileVerificationRequestRepository profileVerificationRequestRepository)
        {
            _profileVerificationRequestRepository = profileVerificationRequestRepository;
        }

        public async Task<ProfileVerificationRequest> GetById(int id)
        {
            return await _profileVerificationRequestRepository.GetById(id);
        }

        public async Task<IEnumerable<ProfileVerificationRequest>> GetAll()
        {
            return await _profileVerificationRequestRepository.GetAll();
        }

        public async Task<ProfileVerificationRequest> FindActiveProfileVerificationRequestByProfileId(int profileId)
        {
            var requests = await _profileVerificationRequestRepository.GetAll();
            return requests.FirstOrDefault(r => r.ProfileId == profileId && !r.Processed);
        }

        public async Task<ProfileVerificationRequest> Insert(ProfileVerificationRequest entity)
        {
            ProfileVerificationRequest request = await FindActiveProfileVerificationRequestByProfileId(entity.ProfileId);
            if (request == null)
            {
                if (entity.ImageFile != null)
                {
                    entity.ImageName = await SaveImage(entity.ImageFile);
                }
                return await _profileVerificationRequestRepository.Insert(entity);
            }
            return null;
        }

        public async Task<ProfileVerificationRequest> Update(ProfileVerificationRequest entity)
        {
            await _profileVerificationRequestRepository.Update(entity);
            return entity;
        }

        public async Task Delete(ProfileVerificationRequest entity)
        {
            //FollowRequest followRequest = await FindFollowRequest(entity.ReceiverId, entity.SenderId);
            await _profileVerificationRequestRepository.Delete(entity);
        }

        public async Task<string> SaveImage(IFormFile imageFile)
        {
            string imageName = new String(Path.GetFileNameWithoutExtension(imageFile.FileName).Take(10).ToArray()).Replace(' ', '-');
            imageName = imageName + DateTime.Now.ToString("yymmssfff") + Path.GetExtension(imageFile.FileName);
            var imagePath = Path.Combine("wwwroot", imageName);
            using (var fileStream = new FileStream(imagePath, FileMode.Create))
            {
                await imageFile.CopyToAsync(fileStream);
            }
            return imageName;
        }
    }
}
