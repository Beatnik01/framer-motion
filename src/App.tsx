import styled from "styled-components";
import { AnimatePresence, Variants, motion } from "framer-motion";
import { useState } from "react";

const Wrapper = styled(motion.div)`
  height: 100vh;
  width: 100vw;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  gap: 10px;
  background: linear-gradient(135deg, rgb(238, 0, 153), rgb(221, 0, 238));
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  width: 50vw;
  gap: 10px;
  div {
    grid-column: span 2;
  }
`;

const Overlay = styled(motion.div)`
  width: 100%;
  height: 100%;
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Box = styled(motion.div)`
  min-height: 400px;
  min-width: 400px;
  height: 400px;
  background-color: rgba(255, 255, 255, 0.7);
  border-radius: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 28px;
  font-weight: 600;
  box-shadow: 0 2px 3px rgba(0, 0, 0, 0.1), 0 10px 20px rgba(0, 0, 0, 0.06);
  cursor: pointer;
`;

const Circle = styled(motion.div)`
  background-color: #00a5ff;
  height: 100px;
  width: 100px;
  border-radius: 50px;
  box-shadow: 0 2px 3px rgba(0, 0, 0, 0.1), 0 10px 20px rgba(0, 0, 0, 0.06);
`;

const Button = styled(motion.button)`
  background-color: white;
  color: black;
  font-size: 30px;
  font-weight: 600;
  width: 100px;
  height: 100px;
  border: none;
  border-radius: 50%;
  cursor: pointer;
`;

const overlayVars: Variants = {
  initial: { backgroundColor: "rgba(0, 0, 0, 0)" },
  animate: { backgroundColor: "rgba(0, 0, 0, 0.5)" },
  exit: { backgroundColor: "rgba(0, 0, 0, 0)" },
};

function App() {
  const [clicked, setClicked] = useState(false);
  const toggleClicked = () => setClicked((prev) => !prev);
  const [id, setId] = useState<null | string>(null);
  return (
    <Wrapper>
      <Grid>
        <AnimatePresence>
          {["1", "2", "3", "4"].map((n) =>
            n === "2" ? (
              <Box
                onClick={() => setId(n)}
                key={n}
                layoutId={n}
                whileTap={{
                  scale: 0.8,
                  rotate: -90,
                  borderRadius: "100%",
                }}
              >
                {clicked ? <Circle layoutId="circle" style={{ borderRadius: 0 }} /> : null}
              </Box>
            ) : n === "3" ? (
              <Box onClick={() => setId(n)} key={n} layoutId={n}>
                {!clicked ? <Circle layoutId="circle" style={{ borderRadius: 50 }} /> : null}
              </Box>
            ) : n === "4" ? (
              <Box
                whileHover={{ translateX: 20, translateY: 20, scale: 1.1 }}
                onClick={() => setId(n)}
                key={n}
                layoutId={n}
              />
            ) : (
              <Box
                whileHover={{ translateX: -20, translateY: -20, scale: 1.1 }}
                onClick={() => setId(n)}
                key={n}
                layoutId={n}
              />
            )
          )}
        </AnimatePresence>
      </Grid>
      <Button
        animate={clicked ? { scale: 1.2, color: "red" } : { scale: 1 }}
        onClick={toggleClicked}
      >
        Click
      </Button>
      <AnimatePresence>
        {id ? (
          <Overlay
            onClick={() => setId(null)}
            variants={overlayVars}
            initial="initial"
            animate="animate"
            exit="exit"
          >
            <Box layoutId={id} style={{ width: 200, height: 200 }} />
          </Overlay>
        ) : null}
      </AnimatePresence>
    </Wrapper>
  );
}

export default App;
