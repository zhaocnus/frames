import { connect } from 'react-redux';
import GfycatGfyInfo from '../../components/GfycatGfyInfo';

const mapStateToProps = ({ user, gfycatMeta }) => {
  return { user, gfycatMeta };
};

const GfycatGfyInfoContainer = connect(mapStateToProps)(GfycatGfyInfo);

export default GfycatGfyInfoContainer
