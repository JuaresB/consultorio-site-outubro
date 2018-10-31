import React from 'react'

export default ({value, color, size}) => {
  const star1 = (value>0&&value<0.25)?"star_border":(value>=0.25&&value<0.75)?"star_half":(value>0.75&&value<=5.0)?"star":"star_border"
  const star2 = (value>0&&value<1.25)?"star_border":(value>=1.25&&value<1.75)?"star_half":(value>1.75&&value<=5.0)?"star":"star_border"
  const star3 = (value>0&&value<2.25)?"star_border":(value>=2.25&&value<2.75)?"star_half":(value>2.75&&value<=5.0)?"star":"star_border"
  const star4 = (value>0&&value<3.25)?"star_border":(value>=3.25&&value<3.75)?"star_half":(value>3.75&&value<=5.0)?"star":"star_border"
  const star5 = (value>0&&value<4.25)?"star_border":(value>=4.25&&value<4.75)?"star_half":(value>4.75&&value<=5.0)?"star":"star_border"

  return(
    <div className="rating">
      <span>{Math.round(10*value)/10}</span>
      <i className="star material-icons">{star1}</i>
      <i className="star material-icons">{star2}</i>
      <i className="star material-icons">{star3}</i>
      <i className="star material-icons">{star4}</i>
      <i className="star material-icons">{star5}</i>
      <style jsx="true">{`
        .rating span{
          font-family: 'Gotham';
          font-weight: bold;
          font-size: ${size}px;
          color: ${color};
          margin-right: 5px
        }
        .rating {
          display: flex;
          justify-content: flex-start;
          margin-top: 5px;
          font-size: ${size}px !important;
        }
        .rating .star{
          font-size: ${size}px;

        }
        .rating i{
          color: ${color};
          display: flex;
          flex-direction: column-reverse;
          justify-content: center;
        }
      `}</style>
    </div>
  )
}
