import makePage from '../component/makePage';
import Table from '../component/Table';
import FileCopyIcon from '@mui/icons-material/FileCopy';
import { Context, useContext } from '../context';

const Staff = () => {
  const { getters } = useContext(Context);
  const staff = getters.content.staff.filter(s => s.active);
  staff.sort((a,b) => a.name.localeCompare(b.name));
  // add FileCopyIcon to email field  
  const data = staff.map((staff, idx) => (
    [
      {
        key: 'name',
        data: staff.name,
        flex: 1,
      },
      {
        key: 'email',
        data: `z${staff.zid}@unsw.edu.au`,
        flex: 1,
        editable: true,
      },
    ]
  ));

  return <Table data={data} maxWidth={600} />

}

export default makePage(Staff, {
  loginRequired: true,
  title: 'Our Staff',
});