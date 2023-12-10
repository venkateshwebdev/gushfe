import { useCallback, useState } from "react";
import GlowCard from "./GlowCard";
import GradientText from "./GradientText";
import { ReactSortable } from "react-sortablejs";
import ArrowButton from "./ArrowButton";
import GlowButton from "./GlowButton";
import { produce } from "immer";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import GlowSpinner from "./GlowSpinner";
import toast from "react-hot-toast";

const ResultViwer = (props) => {
  const { data, onSaveProcess, onDeleteProcess, isLoading } = props;
  const [cards, setCards] = useState(data.steps);
  const [processName, setProcessName] = useState(
    data.name ?? "Click here to enter process name"
  );
  const [currentCard, setCurrentCard] = useState();
  const [isEditing, setIsEditing] = useState(false);

  const onModalCancel = () => {
    setCurrentCard(undefined);
    toast("Changes discarded");
  };
  const onModalSave = () => {
    const isNewCard = cards.findIndex((obj) => obj.id === currentCard.id);
    if (isNewCard === -1) {
      setCards(
        produce((draft) => {
          draft.push(currentCard);
          setCurrentCard(undefined);
        })
      );
    } else {
      setCards(
        produce((draft) => {
          draft[isNewCard] = { ...draft[isNewCard], ...currentCard };
          setCurrentCard(undefined);
        })
      );
    }
    toast("Changes has been added Dont forget to save");
  };

  const addNewCard = () => {
    setCurrentCard({
      id: Date.now(),
      title: "",
      description: "",
    });
  };

  const moveCard = useCallback((dragIndex, hoverIndex) => {
    setCards((prevCards) =>
      produce(prevCards, (draft) => {
        const [removedCard] = draft.splice(dragIndex, 1);
        draft.splice(hoverIndex, 0, removedCard);
      })
    );
  }, []);

  if (isLoading) return <GlowSpinner />;

  return (
    <div className="w-full h-full flex flex-col gap-8 items-center justify-around">
      {currentCard && (
        <div className="backdrop-blur-md top-0 w-full h-full absolute z-50 grid place-items-center">
          <div className="relative">
            <div className="absolute transitiona-all duration-1000 opacity-100 bg-gradient-to-r from-[#44BCFF] via-[#FF44EC] to-[#FF675E] rounded-xl blur-sm -inset-1  -z-10"></div>
            <form className="w-[700px] bg-gray-900 flex flex-col gap-2 px-8 py-12 rounded-lg">
              <input
                type="text"
                className="block p-4 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Enter process title"
                value={currentCard.title}
                onChange={(e) =>
                  setCurrentCard(
                    produce((draft) => {
                      draft.title = e.target.value;
                    })
                  )
                }
              />
              <textarea
                rows={5}
                className="block p-4 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Enter process description"
                value={currentCard.description}
                onChange={(e) =>
                  setCurrentCard(
                    produce((draft) => {
                      draft.description = e.target.value;
                    })
                  )
                }
              />
              <div className="flex gap-2 self-end mt-3">
                <ArrowButton onClick={onModalSave} text="Save" />
                <ArrowButton onClick={onModalCancel} text="Cancel" />
              </div>
            </form>
          </div>
        </div>
      )}
      <div className="space-y-8 w-[1240px]">
        <div className="w-full flex justify-center ">
          <div className="flex gap-6 w-full justify-center">
            {isEditing ? (
              <input
                type="text"
                className="block p-4 w-1/2 text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Enter process title"
                value={processName}
                onChange={(e) => setProcessName(e.target.value)}
              />
            ) : (
              <GradientText text={processName} />
            )}
          </div>
        </div>
        <div className="max-h-[520px] overflow-scroll relative">
          {!isEditing && <div className="w-full h-full absolute z-20"></div>}
          <DndProvider backend={HTML5Backend}>
            <div className="grid grid-cols-3 gap-6">
              {cards?.map((card, i) => (
                <GlowCard
                  key={card.id}
                  index={i}
                  id={card.id}
                  title={card.title}
                  description={card.description}
                  isEditing={isEditing}
                  moveCard={moveCard}
                  onEdit={() => {
                    setCurrentCard({
                      id: card.id,
                      title: card.title,
                      description: card.description,
                    });
                  }}
                  onDelete={() => {
                    // remove card.id
                    setCards(
                      produce((draft) => {
                        const indexToRemove = draft.findIndex(
                          (obj) => obj.id === card.id
                        );
                        if (indexToRemove !== -1) {
                          draft.splice(indexToRemove, 1);
                        }
                      })
                    );
                    toast("Card has been removed Dont forget to save");
                  }}
                />
              ))}
            </div>
          </DndProvider>
        </div>
      </div>

      {cards?.length === 0 && (
        <div>
          <h2 className="font-bold opacity-30">
            Uh! Oh. No steps added yet? Add your steps by clicking the below
            Edit steps button
          </h2>
        </div>
      )}

      {isEditing ? (
        <div className="flex gap-2 justify-between w-full">
          <ArrowButton onClick={addNewCard} text="Add Step" />
          <div className="flex gap-2">
            <ArrowButton
              danger
              text="Delete Process"
              onClick={() => {
                onDeleteProcess(data._id ?? "new");
              }}
            />
            <ArrowButton
              success
              text="Save Process"
              onClick={() => {
                onSaveProcess({
                  id: data._id ?? "new",
                  name: processName,
                  steps: cards,
                  createdByAI: data.createdByAI,
                });
                setIsEditing(false);
              }}
            />
          </div>
        </div>
      ) : (
        <div className="flex justify-end w-full">
          <GlowButton
            onClick={() => setIsEditing(true)}
            text={"Edit/ Arrange steps"}
          />
        </div>
      )}
    </div>
  );
};

export default ResultViwer;
