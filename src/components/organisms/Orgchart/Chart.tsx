import React, { Fragment } from "react";
import { nanoid } from 'nanoid';
import './organogram.css'
import data from "./data.json";

const Card: React.FC<{ data: any }> = ({ data }) => {
  return (
    <ul>
      {data.map((item: any, index: number) => (
        <Fragment key={nanoid()}>
          <li>
            <div className="card">
              <div className="image-org-chart">
                {/* Use the `require` function to load the image from the local folder */}
                <img
                  src={require(`./images/${item.image}`)}
                  alt="Profile"
                  style={{ borderColor: '#064D6F' }}
                />
              </div>
              <div className="card-body">
                <h4>{item.name}</h4>
                <p>{item.designation}</p>
              </div>
            </div>
            {item.children?.length && <Card data={item.children} />}
          </li>
        </Fragment>
      ))}
    </ul>
  );
};

const Chart: React.FC = () => {
  return (
    <div className="org-tree">
      <Card data={data} />
    </div>
  );
};

export default Chart;