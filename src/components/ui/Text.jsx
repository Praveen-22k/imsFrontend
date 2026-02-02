import SplitText from "../animations/SplitText.jsx";

const Text = () => {
  return (
    <div className="pt-16 pb-10 flex flex-col items-center gap-3">
      <SplitText
        text="Welcome to SmartRack Inventory"
        className="text-4xl font-bold text-center text-purple-600"
        delay={0.05}
        tag="h1"
      />

      <SplitText
        text="Your satisfaction and happiness are our mission!"
        className="text-lg font-medium text-center text-gray-600"
        delay={0.03}
        tag="p"
      />
    </div>
  );
};

export default Text;
