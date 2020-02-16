using AutoMapper;
using Infrastructure.PivotalApi.Models;
using Web.Models.Story;

namespace Web.Models
{
  public class MappingProfile : Profile
  {

    public MappingProfile()
    {
      CreateMap<PivotalStory, StorySummary>()
        .ForMember(dest => dest.Title, opt => opt.MapFrom(src => src.Name))
        .ForMember(dest => dest.StoryType, opt => opt.MapFrom(src => src.Story_Type))
        .ForMember(dest => dest.CurrentState, opt => opt.MapFrom(src => src.Current_State))
        .ForMember(dest => dest.OwnerIds, opt => opt.MapFrom(src => src.Owner_Ids));
    }
  }
}