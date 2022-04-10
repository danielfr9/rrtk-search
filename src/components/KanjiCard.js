// Data
import noKanji from "../assets/noKanji";
// Hooks
import { useClipboard } from "@mantine/hooks";
// Components
import { ActionIcon, Card, Badge, Tooltip } from "@mantine/core";
import { useMantineColorScheme } from "@mantine/core";
// Icons
import { BiCopy } from "react-icons/bi";

const KanjiCard = ({ data }) => {
  const clipboard = useClipboard({ timeout: 1500 });
  const { colorScheme } = useMantineColorScheme();
  const dark = colorScheme === "dark";

  return (
    <Card className={`h-64 border-2 shadow-md ${dark && `border-[#373A40]`}`}>
      <div className="flex items-center justify-between">
        <Badge className="my-1" color="indigo" size="lg" variant="filled">
          {data.heisig_number || "Primitive"}
        </Badge>
        {data.kanji && (
          <Tooltip
            gutter={10}
            label={clipboard.copied ? "Copied" : "Copy Kanji"}
            color={clipboard.copied ? "indigo" : "cyan"}
            position="left"
            withArrow
          >
            <ActionIcon
              onClick={() => clipboard.copy(data.kanji)}
              radius="sm"
              variant="hover"
              color="cyan"
              size="lg"
            >
              <BiCopy size="1.5rem" />
            </ActionIcon>
          </Tooltip>
        )}
      </div>
      <div className="flex items-center justify-center py-4">
        <h2 className="text-5xl font-semibold py-5">
          {data.kanji ? (
            data.kanji
          ) : (
            <img
              className="h-12"
              src={`/primitives/${noKanji[data.keywords.primary]}`}
              alt={data.keywords.primary}
            />
          )}
        </h2>
      </div>
      <h3 className="text-lg">{data.keywords.primary}</h3>
    </Card>
  );
};

export default KanjiCard;
