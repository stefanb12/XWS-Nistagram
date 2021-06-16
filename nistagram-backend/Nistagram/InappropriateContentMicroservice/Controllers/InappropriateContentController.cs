using InappropriateContentMicroservice.Service;
using Microsoft.AspNetCore.Mvc;

namespace InappropriateContentMicroservice.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class InappropriateContentController : Controller
    {
        private readonly IInappropriateContentService _inappropriateContentService;

        public InappropriateContentController(IInappropriateContentService inappropriateContentService)
        {
            _inappropriateContentService = inappropriateContentService;
        }


    }
}
