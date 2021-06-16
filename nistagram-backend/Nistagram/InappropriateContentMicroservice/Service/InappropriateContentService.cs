﻿using InappropriateContentMicroservice.Model;
using InappropriateContentMicroservice.Repository;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace InappropriateContentMicroservice.Service
{
    public class InappropriateContentService : IInappropriateContentService
    {
        private IInappropriateContentRepository _inappropriateContentRepository;

        public InappropriateContentService(IInappropriateContentRepository inappropriateContentRepository)
        {
            _inappropriateContentRepository = inappropriateContentRepository;
        }
       
        public async Task<InappropriateContent> GetById(int id)
        {
            return await _inappropriateContentRepository.GetById(id);
        }

        public async Task<IEnumerable<InappropriateContent>> GetAll()
        {
            return await _inappropriateContentRepository.GetAll();
        }

        public async Task<InappropriateContent> Insert(InappropriateContent entity)
        {
            return await _inappropriateContentRepository.Insert(entity);
        }

        public async Task<InappropriateContent> Update(InappropriateContent entity)
        {
            await _inappropriateContentRepository.Update(entity);
            return entity;
        }

        public async Task Delete(InappropriateContent entity)
        {
            await _inappropriateContentRepository.Delete(entity);
        }
    }
}
