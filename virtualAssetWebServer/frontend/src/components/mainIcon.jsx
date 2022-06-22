import Asset_blue from '../Icons/Asset_blue.png';
import Asset_white from '../Icons/Asset_white.png';
import Home_blue from '../Icons/Home_blue.png';
import Home_white from '../Icons/Home_white.png';
import Explore_blue from '../Icons/Explore_blue.png';
import Explore_white from '../Icons/Explore_white.png';
import User_blue from '../Icons/User_blue.png';
import User_white from '../Icons/User_white.png';

export default function MainIcon(props){
    var blue;
    var white;
    switch (props.type){
      case 'home':
        blue=Home_blue;
        white=Home_white;
        break;
      case 'explore':
        blue=Explore_blue;
        white=Explore_white;
        break;
      case 'asset':
        blue=Asset_blue;
        white=Asset_white;
        break;
      case 'user':
        blue=User_blue;
        white=User_white;
        break;
    }
    let style='icon'+(props.hl?' highLight':'');

    function IconClick(){
      if(props.currMainWindow!=props.index)
      props.setIndex(props.index);
    }
    return(
      <span id={props.type+'Button'} className='mainIcon' onClick={IconClick}>
        <img className={style} src={white}/>
        <img id='hl' className={'opz '+style} src={blue}/>
      </span>
    );
  }