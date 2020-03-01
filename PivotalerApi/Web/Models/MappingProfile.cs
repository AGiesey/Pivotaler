using AutoMapper;
using Data.Entities.Pivotal;
using Infrastructure.PivotalApi.Models;
using Web.Controllers.Models.Users;
using Web.Models.Story;
using Web.Models.User;
using Data.Entities.Agile;
using Infrastructure.Models;

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

      CreateMap<PivotalStory, StoryDetails>()
        .ForMember(dest => dest.Title, opt => opt.MapFrom(src => src.Name))
        .ForMember(dest => dest.ProjectId, opt => opt.MapFrom(src => src.Project_Id))
        .ForMember(dest => dest.StoryType, opt => opt.MapFrom(src => src.Story_Type))
        .ForMember(dest => dest.CurrentState, opt => opt.MapFrom(src => src.Current_State))
        .ForMember(dest => dest.AcceptedAt, opt => opt.MapFrom(src => src.Accepted_At))
        .ForMember(dest => dest.OwnerIds, opt => opt.MapFrom(src => src.Owner_Ids))
        .ForMember(dest => dest.TaskIds, opt => opt.MapFrom(src => src.Task_Ids))
        .ForMember(dest => dest.BlockerIds, opt => opt.MapFrom(src => src.Blocker_Ids))
        .ForMember(dest => dest.CommentIds, opt => opt.MapFrom(src => src.Comment_Ids))
        .ForMember(dest => dest.CreatedAt, opt => opt.MapFrom(src => src.Created_At))
        .ForMember(dest => dest.UpdatedAt, opt => opt.MapFrom(src => src.Updated_At))
        .ForMember(dest => dest.BlockedStoryIds, opt => opt.MapFrom(src => src.Blocked_Story_Ids));

      CreateMap<Data.Entities.Identity.User, UserModel>()
        .IncludeMembers(s => s.PivotalUser);

      CreateMap<PivotalUser, UserModel>(MemberList.None);

      CreateMap<PivotalUser, PivotalUserModel>()
        .ReverseMap();

      CreateMap<Iteration, IterationModel>()
        .ReverseMap();
        // .IncludeMembers(s => s.DataPoints);

      CreateMap<IterationDataPoint, IterationDataPointModel>(MemberList.None)
        .ReverseMap();

      CreateMap<EditDatapointModel, IterationDataPoint>()
        .ReverseMap();
    }
  }
}