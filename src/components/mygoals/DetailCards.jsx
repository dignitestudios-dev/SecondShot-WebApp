import React from "react";

const DetailCards = () => {
  const GoalDetailData = [
    {
      heading: "Digital Marketing Course",
      para: "Lorem ipsum dolor sit amet consectetur. malesuada dolor diam Vitae facilisis nulla id dignissim erat arcu pretium. Proin sed curabitur id aenean. Nulla nunc tristique sit tortor euismod quis est ut. Erat nisi scelerisque a porta ullamcorper lectus phasellus tortor. Eu non cursus adipiscing.",
    },
    {
      heading: "Specific",
      para: "Lorem ipsum dolor sit amet consectetur. malesuada dolor diam Vitae facilisis nulla id dignissim erat arcu pretium. Proin sed curabitur id aenean. Nulla nunc tristique sit tortor euismod quis est ut. Erat nisi scelerisque a porta ullamcorper lectus phasellus tortor. Eu non cursus adipiscing.",
    },
    {
      heading: "Measurable",
      para: "Lorem ipsum dolor sit amet consectetur. malesuada dolor diam Vitae facilisis nulla id dignissim erat arcu pretium. Proin sed curabitur id aenean. Nulla nunc tristique sit tortor euismod quis est ut. Erat nisi scelerisque a porta ullamcorper lectus phasellus tortor. Eu non cursus adipiscing.",
    },
  ];
  const AchievableData = [
    {
      heading: "",
      para: "Lorem ipsum dolor sit amet consectetur. malesuada dolor diam Vitae facilisis nulla id dignissim erat arcu pretium. Proin sed curabitur id aenean. Nulla nunc tristique sit tortor euismod quis est ut. Erat nisi scelerisque a porta ullamcorper lectus phasellus tortor. Eu non cursus adipiscing.",
    },
    {
      heading: "Relevant",
      para: "Lorem ipsum dolor sit amet consectetur. malesuada dolor diam Vitae facilisis nulla id dignissim erat arcu pretium. Proin sed curabitur id aenean. Nulla nunc tristique sit tortor euismod quis est ut. Erat nisi scelerisque a porta ullamcorper lectus phasellus tortor. Eu non cursus adipiscing.",
    },
    {
      heading: "Time-Bound",
      para: "Lorem ipsum dolor sit amet consectetur. malesuada dolor diam Vitae facilisis nulla id dignissim erat arcu pretium. Proin sed curabitur id aenean. Nulla nunc tristique sit tortor euismod quis est ut. Erat nisi scelerisque a porta ullamcorper lectus phasellus tortor. Eu non cursus adipiscing.",
    },
  ];

  return (
    <div>
      <div className="flex gap-3 mt-11">
        {GoalDetailData?.map((item, index) => (
          <>
            <div key={index}>
              <h3 className="text-[16px] font-[600] leading-[21.6px] text-[#222222] ">
                {item?.heading}
              </h3>
              <p className="text-[#9A9A9A]  text-justify font-[400] text-[16px] leading-[21.6px] mt-3 ">
                {item?.para}
              </p>
            </div>
            {index === 2 ? (
              ""
            ) : (
              <div className="bg-[#0000001A] w-[2px] h-[280px] "></div>
            )}
          </>
        ))}
      </div>
      <div className="flex items-center gap-1 mt-3">
        <h3 className="text-[16px] font-[600] leading-[21.6px] text-[#222222] ">
          Achievable
        </h3>
        <div className="w-full h-[1px] bg-[#0000001A] "></div>
      </div>
      <div className="flex gap-3 mt-5">
        {AchievableData?.map((item, index) => (
          <>
            <div key={index}>
              <h3 className="text-[16px] font-[600] leading-[21.6px] text-[#222222] ">
                {item?.heading}
              </h3>
              <p className="text-[#9A9A9A] text-justify font-[400] text-[16px] leading-[21.6px] mt-3 ">
                {item?.para}
              </p>
            </div>
            {index === 2 ? (
              ""
            ) : (
              <div className="bg-[#0000001A] w-[2px] h-[280px] "></div>
            )}
          </>
        ))}
      </div>
    </div>
  );
};

export default DetailCards;
