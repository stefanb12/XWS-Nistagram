using CampaignMicroservice.Model;
using CampaignMicroservice.Repository;
using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;

namespace CampaignMicroservice.Service
{
    public class CommercialService : ICommercialService
    {
        private ICommercialRepository _commercialRepository;

        public CommercialService(ICommercialRepository commercialRepository)
        {
            _commercialRepository = commercialRepository;
        }

        public async Task<List<Commercial>> GetCommercialsForAgent(int agentId)
        {
            List<Commercial> commercialsForAgent = new List<Commercial>();
            foreach(Commercial commercial in await GetAll())
            {
                if(commercial.AgentId == agentId)
                {
                    commercial.ImageSrc = String.Format("http://localhost:56000/{0}", commercial.ImageName);
                    commercialsForAgent.Add(commercial);
                }
            }
            return commercialsForAgent;
        }

        public async Task<Commercial> GetById(int id)
        {
            return await _commercialRepository.GetById(id);
        }

        public async Task<IEnumerable<Commercial>> GetAll()
        {
            return await _commercialRepository.GetAll();
        }

        public async Task<Commercial> Insert(Commercial entity)
        {
            entity.ImageName = await SaveImage(entity.ImageFile);
            return await _commercialRepository.Insert(entity);
        }

        public async Task<Commercial> Update(Commercial entity)
        {
            await _commercialRepository.Update(entity);
            return entity;
        }

        public async Task Delete(Commercial entity)
        {
            await _commercialRepository.Delete(entity);
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
